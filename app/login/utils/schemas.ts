import { z } from "zod";

// --- Validation Schemas ---

// Regex for Iranian phone numbers: starts with 09, followed by 9 digits
const phoneRegex = /^09[0-9]{9}$/;

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد")
    .regex(phoneRegex, "الگوی شماره تماس صحیح نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"),
});

export const otpSchema = z.object({
  otp: z.string().min(4, "کد تایید باید حداقل ۴ رقم باشد"),
});

export type PhoneNumberFormValues = z.infer<typeof phoneNumberSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
