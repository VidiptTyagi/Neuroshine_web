import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function ok<T extends object>(data: T = {} as T, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

export function badRequest(error: ZodError) {
  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      issues: error.flatten().fieldErrors,
    },
    { status: 400 },
  );
}

export function tooMany(resetAt: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return NextResponse.json(
    { success: false, error: "Too many requests. Please try again shortly." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

export function serverError(message = "Something went wrong") {
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}
