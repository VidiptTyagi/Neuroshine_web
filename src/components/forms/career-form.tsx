"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";
import { careerSchema, type CareerInput } from "@/lib/validations";
import { jobs } from "@/content/data/misc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB

export function CareerForm({ defaultPosition }: { defaultPosition?: string }) {
  const [sent, setSent] = React.useState(false);
  const [resume, setResume] = React.useState<File | null>(null);
  const [resumeError, setResumeError] = React.useState<string>("");

  const form = useForm<CareerInput>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: defaultPosition ?? "",
      experience: "",
      message: "",
    },
  });

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setResumeError("");
    if (file) {
      if (file.size > MAX_RESUME_BYTES) {
        setResumeError("Resume must be under 5MB.");
        setResume(null);
        return;
      }
      if (!/pdf|msword|officedocument/.test(file.type)) {
        setResumeError("Please upload a PDF or Word document.");
        setResume(null);
        return;
      }
    }
    setResume(file);
  }

  async function onSubmit(values: CareerInput) {
    if (!resume) {
      setResumeError("Please attach your resume.");
      return;
    }
    try {
      const data = new FormData();
      Object.entries(values).forEach(([k, v]) => data.append(k, v ?? ""));
      data.append("resume", resume);

      const res = await fetch("/api/careers", { method: "POST", body: data });
      if (!res.ok) throw new Error();
      setSent(true);
      toast.success("Application submitted!");
    } catch {
      toast.error("Could not submit. Please email us your resume instead.");
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold">Application received!</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for your interest in joining NeuroShine. Our team will review
          your application and be in touch if there's a fit.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 …" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 3 years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobs.map((j) => (
                    <SelectItem key={j.slug} value={j.title}>
                      {j.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="General Application">
                    General Application
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover note (optional)</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Tell us why you'd love to join NeuroShine…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <label className="text-sm font-medium">Resume (PDF/DOC) *</label>
          <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border p-4 transition-colors hover:border-primary/50">
            <Upload className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {resume ? resume.name : "Click to upload your resume (max 5MB)"}
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={onFile}
            />
          </label>
          {resumeError ? (
            <p className="mt-1.5 text-sm text-destructive">{resumeError}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full sm:w-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Submit Application"
          )}
        </Button>
      </form>
    </Form>
  );
}
