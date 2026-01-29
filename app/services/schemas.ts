import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  firstname: z.string().nullable().optional(),
  lastname: z.string().nullable().optional(),
  national_code: z.string().nullable().optional(),
  phone: z.string(),
  school: z.string().nullable().optional(),
  field: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  district: z.string().nullable().optional(),
  grade: z.string().nullable().optional(),
  is_info_correct: z.boolean().optional(),
  favorites: z.array(z.any()).optional(),
  meta: z.any().optional(),
});

export type UserData = z.infer<typeof UserSchema>;

export interface ApiResponse<T> {
  code?: number;
  status?: string;
  message?: string;
  data: T;
}
