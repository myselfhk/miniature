"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  role: z.string().min(1, "Role is required"),
  domain: z.string().optional(),
  location: z.string().optional(),
  expertise_tags: z.string().optional(), // We aren't using this in the new form directly, but keeping schema safe
  availability: z.string().min(1, "Availability is required"),
  hourly_rate_range: z.string().optional(), // Not in new short form
  visibility_preference: z.enum(["anonymous", "first-name-only", "public"]),
  compliance_confirmed: z.boolean().refine((val) => val === true, {
    message: "You must confirm compliance",
  }),
  notes: z.string().optional(),
});

export async function submitConsultantApplication(formData: FormData) {
  const supabase = await getSupabaseServerClient();

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    linkedin: formData.get("linkedin"),
    role: formData.get("role"),
    domain: formData.get("domain"),
    location: formData.get("location"),
    availability: formData.get("availability"),
    visibility_preference: formData.get("visibility_preference"),
    compliance_confirmed: formData.get("compliance_confirmed") === "on",
    // We'll store location in notes if column doesn't exist, or just append
    notes: formData.get("location")
      ? `Location: ${formData.get("location")}`
      : "",
  };

  const result = applicationSchema.safeParse(rawData);

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  // Insert into DB
  const { error } = await supabase
    .from("people_consultant_applications")
    .insert({
      name: result.data.name,
      email: result.data.email,
      linkedin: result.data.linkedin,
      role: result.data.role,
      domain: result.data.domain,
      availability: result.data.availability,
      visibility_preference: result.data.visibility_preference,
      compliance_confirmed: result.data.compliance_confirmed,
      notes: result.data.notes,
      // Default others
      expertise_tags: [],
      hourly_rate_range: "Negotiable",
    });

  if (error) {
    console.error("Application error:", error);
    return {
      error: { form: "Failed to submit application. Please try again." },
    };
  }

  return { success: true };
}
