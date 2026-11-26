import { z } from "zod";
import { STATUSES } from "../statuses";

const getToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

export const applicationSchema = z
  .object({
    company: z.string().trim().min(1, "Enter the company name"),
    jobTitle: z.string().trim().min(1, "Enter the job title"),
    location: z.string().trim().min(1, "Enter a city or enter Remote"),
    dateApplied: z
      .string()
      .trim()
      .regex(DATE_FORMAT, "Use the format YYYY-MM-DD"),
    status: z.enum(STATUSES, { error: "Choose a status" }),
    salaryMin: z.string().regex(/^\d*$/, "Numbers only"),
    salaryMax: z.string().regex(/^\d*$/, "Numbers only. "),
    interviewDate: z
      .string()
      .regex(
        /^(\d{4}-\d{2}-\d{2})?$/,
        "Use the format YYYY-MM-DD, or leave it empty",
      ),
    offerAmount: z
      .string()
      .regex(/^\d*$/, "Enter the offer as a whole number, no $ or commas"),
    contactEmail: z
      .email("Enter a valid email, or leave it empty")
      .or(z.literal("")),
    notes: z.string().max(500, "Keep notes to 500 characters or fewer"),
  })

  // Rule 1: the date applied cannot be in the future.
  .refine(
    (data) =>
      !DATE_FORMAT.test(data.dateApplied) || data.dateApplied <= getToday(),
    {
      message: "The date applied can't be in the future",
      path: ["dateApplied"],
    },
  )
  // Rule 2: if both salaries are entered, the maximum must be at least the minimum.
  .refine(
    (data) =>
      data.salaryMin === "" ||
      data.salaryMax === "" ||
      Number(data.salaryMax) >= Number(data.salaryMin),
    {
      message:
        "The maximum salary must be the same as or higher than the minimum",
      path: ["salaryMax"],
    },
  )
  // Rule 3: when the status is Interview, the interview date is required.
  .refine((data) => data.status !== "Interview" || data.interviewDate !== "", {
    message: "Enter the interview date",
    path: ["interviewDate"],
  })
  // Rule 4: an interview date must be on or after the date applied.
  .refine(
    (data) =>
      data.interviewDate === "" || data.interviewDate >= data.dateApplied,
    {
      message: "The interview date must be on or after the date you applied",
      path: ["interviewDate"],
    },
  )
  // Rule 5: when the status is Offer, the offer amount is required.
  .refine((data) => data.status !== "Offer" || data.offerAmount !== "", {
    message: "Enter the offer amount as a whole number",
    path: ["offerAmount"],
  })
  // Rule 6: when the status is not Offer, the offer amount must be empty.
  .refine((data) => data.status === "Offer" || data.offerAmount === "", {
    message: "Remove the offer amount, or change the status to Offer",
    path: ["offerAmount"],
  });

// The form's TypeScript type, worked out from the rules above.
export type ApplicationValues = z.infer<typeof applicationSchema>;

// A saved application is the form values plus an id.
export type Application = ApplicationValues & { id: string };

// A blank form for "Add application". Status starts as Applied.
export const emptyApplication: ApplicationValues = {
  company: "",
  jobTitle: "",
  location: "",
  dateApplied: "",
  status: "Applied",
  salaryMin: "",
  salaryMax: "",
  interviewDate: "",
  offerAmount: "",
  contactEmail: "",
  notes: "",
};
