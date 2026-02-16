import { z } from 'zod';

// --- Validation Schemas ---

// Regex for Iranian phone numbers: starts with 09, followed by 9 digits
const phoneRegex = /^09[0-9]{9}$/;

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, 'شماره تماس باید ۱۱ رقم باشد')
    .max(11, 'شماره تماس باید ۱۱ رقم باشد')
    .regex(phoneRegex, 'الگوی شماره تماس صحیح نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'),
});

export const otpSchema = z.object({
  otp: z.string().min(4, 'کد تایید باید حداقل ۴ رقم باشد'),
});

export type PhoneNumberFormValues = z.infer<typeof phoneNumberSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;

// Customer Registration Schema
export const customerRegisterSchema = z
  .object({
    firstname: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
    lastname: z.string().min(2, 'نام خانوادگی باید حداقل ۲ حرف باشد'),
    gender: z.string().or(z.number()), // UI might use string '1'/'2', schema says number
    birthday: z.string().min(1, 'تاریخ تولد الزامی است'),
    password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
    password_confirmation: z.string().min(1, 'تکرار رمز عبور الزامی است'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'رمز عبور و تکرار آن مطابقت ندارند',
    path: ['password_confirmation'],
  });

export type CustomerRegisterValues = z.infer<typeof customerRegisterSchema>;

// Customer Login Schema
export const customerLoginSchema = z.object({
  password: z.string().min(1, 'رمز عبور الزامی است'),
});

export const nationalIdSchema = z.object({
  nationalId: z
    .string()
    .min(10, 'شماره ملی باید ۱۰ رقم باشد')
    .max(10, 'شماره ملی باید ۱۰ رقم باشد')
    .regex(/^\d+$/, 'شماره ملی تنها باید شامل اعداد باشد'),
});

export type NationalIdFormValues = z.infer<typeof nationalIdSchema>;

export type CustomerLoginValues = z.infer<typeof customerLoginSchema>;
