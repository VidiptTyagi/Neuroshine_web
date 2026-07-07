"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  CheckCircle2,
  CreditCard,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { appointmentSchema, type AppointmentInput } from "@/lib/validations";
import { services } from "@/content/services";
import { therapists } from "@/content/therapists";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
];

export function AppointmentForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      childName: "",
      childAge: "",
      service: defaultService ?? "",
      therapist: "",
      date: "",
      time: "",
      payment: "clinic",
      notes: "",
    },
  });

  async function onSubmit(values: AppointmentInput) {
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast.success("Appointment request sent!");
    } catch {
      toast.error("Could not submit. Please call us or try again.");
    }
  }

  if (submitted) {
    return (
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <CheckCircle2 className="h-14 w-14 text-emerald-500" />
          <h3 className="mt-4 text-2xl font-bold">Request received!</h3>
          <p className="mt-2 max-w-md text-muted-foreground">
            Thank you for booking with NeuroShine. Our team will confirm your
            appointment within one working day by phone or email.
          </p>
          <Button
            className="mt-6 rounded-full"
            variant="outline"
            onClick={() => {
              form.reset();
              setSubmitted(false);
            }}
          >
            Book another appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  const selectedDate = form.watch("date");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Service & therapist */}
        <fieldset className="space-y-5">
          <legend className="text-lg font-semibold">1. What do you need?</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.slug} value={s.title}>
                          {s.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="therapist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred therapist (optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Any available therapist" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {therapists.map((t) => (
                        <SelectItem key={t.slug} value={t.name}>
                          {t.name} — {t.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        {/* Step 2: Date & time */}
        <fieldset className="space-y-5">
          <legend className="text-lg font-semibold">2. Pick a date & time</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Choose a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) =>
                          field.onChange(d ? d.toISOString() : "")
                        }
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date.getDay() === 0
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedDate}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            selectedDate ? "Select a slot" : "Pick a date first"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        {/* Step 3: Details */}
        <fieldset className="space-y-5">
          <legend className="text-lg font-semibold">3. Your details</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="parentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent / guardian name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child's name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Child" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 4 yrs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Tell us anything that helps us prepare…"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* Step 4: Payment */}
        <fieldset className="space-y-3">
          <legend className="text-lg font-semibold">4. Payment preference</legend>
          <FormField
            control={form.control}
            name="payment"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "clinic", label: "Pay at clinic", icon: Building2, desc: "Settle at your visit" },
                    { value: "online", label: "Pay online", icon: CreditCard, desc: "Secure online payment" },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const active = field.value === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => field.onChange(opt.value)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                          active
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40",
                        )}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span>
                          <span className="block text-sm font-medium">
                            {opt.label}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {opt.desc}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Request Appointment"
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          We'll confirm your appointment within one working day. Online payment
          processing is enabled once a payment provider is connected.
        </p>
      </form>
    </Form>
  );
}
