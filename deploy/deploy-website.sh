#!/usr/bin/env bash
#
# Build the Next.js site locally (standalone output), ship it, restart.
#
#   DEPLOY_HOST=<lightsail-ip-or-hostname> ./deploy/deploy-website.sh
#
# Expects: passwordless SSH (key in ~/.ssh or an agent) to a sudo-capable
# user, the systemd unit already installed (neuroshine-backend/deploy/neuroshine-website.service),
# and NEXT_PUBLIC_* build-time vars present locally (.env.production.local —
# see ../.env.example). First-time setup is in
# neuroshine-backend/deploy/README.md §2.8.

set -euo pipefail

HOST="${DEPLOY_HOST:?set DEPLOY_HOST, e.g. the Lightsail static IP}"
USER="${DEPLOY_USER:-ubuntu}"
SSH_OPTS="${SSH_OPTS:--o StrictHostKeyChecking=accept-new -o ConnectTimeout=10}"
REMOTE_DIR="${REMOTE_DIR:-/opt/neuroshine-website}"
SERVICE="${SERVICE:-neuroshine-website}"
HEALTH_URL="${HEALTH_URL:-https://neuroshine.in}"
SKIP_TESTS="${SKIP_TESTS:-false}"

cd "$(dirname "$0")/.."

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$1"; }

say "Installing deps"
npm ci

if [ "$SKIP_TESTS" != "true" ]; then
  say "Type-checking"
  npm run typecheck
fi

say "Building (standalone output)"
npm run build

# .next/standalone has server.js + a pruned node_modules, but Next does not
# copy static assets or public/ into it — that's on us.
PKG=$(mktemp -d)
trap 'rm -rf "$PKG"' EXIT
cp -r .next/standalone/. "$PKG/"
mkdir -p "$PKG/.next"
cp -r .next/static "$PKG/.next/static"
cp -r public "$PKG/public"

say "Uploading to $USER@$HOST:$REMOTE_DIR.new"
# /opt is root-owned, so $USER (ubuntu) can't mkdir under it directly — sudo
# creates the staging dir and hands it to $USER just long enough for rsync;
# the swap step below (already root) gives it back to the neuroshine user.
ssh $SSH_OPTS "$USER@$HOST" \
  "sudo rm -rf $REMOTE_DIR.new && sudo mkdir -p $REMOTE_DIR.new && sudo chown $USER:$USER $REMOTE_DIR.new"
rsync -az --delete -e "ssh $SSH_OPTS" "$PKG/" "$USER@$HOST:$REMOTE_DIR.new/"

say "Swapping in and restarting"
ssh $SSH_OPTS "$USER@$HOST" \
    "sudo REMOTE_DIR='$REMOTE_DIR' SERVICE='$SERVICE' bash -euo pipefail -s" <<'REMOTE'
  # Keep exactly one rollback target: the build that is serving right now.
  if [ -d "$REMOTE_DIR" ]; then
    rm -rf "$REMOTE_DIR.previous"
    mv "$REMOTE_DIR" "$REMOTE_DIR.previous"
  fi
  mv "$REMOTE_DIR.new" "$REMOTE_DIR"
  chown -R neuroshine:neuroshine "$REMOTE_DIR"
  systemctl restart "$SERVICE"
REMOTE

say "Health check"
for i in $(seq 1 10); do
  if curl -fsS -m 8 "$HEALTH_URL" > /dev/null 2>&1; then
    say "OK: $HEALTH_URL responding"
    exit 0
  fi
  sleep 2
done

echo "Site did not come up healthy — rolling back" >&2
ssh $SSH_OPTS "$USER@$HOST" \
    "sudo REMOTE_DIR='$REMOTE_DIR' SERVICE='$SERVICE' bash -euo pipefail -s" <<'REMOTE'
  rm -rf "$REMOTE_DIR"
  mv "$REMOTE_DIR.previous" "$REMOTE_DIR"
  systemctl restart "$SERVICE"
REMOTE
echo "Rolled back to the previous build. Check: journalctl -u $SERVICE -n 60" >&2
exit 1
