import { z } from 'zod';

// --- API Response Types ---
export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

// --- User Data Types ---
export interface UserData {
  id: number;
  phone: string;
  firstname?: string;
  lastname?: string;
  national_code?: string;
  school?: string;
  grade?: string;
  field?: string;
  province?: string;
  city?: string;
  district?: string;
  is_info_correct?: boolean;
  favorites?: boolean;
  meta?: boolean;
  cell?: unknown;
  profile_image?: string;
  // Add other fields as per your API response
}

// --- Zod Schemas ---
export const UserSchema = z.object({
  id: z.number(),
  phone: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  national_code: z.string().optional(),
  school: z.string().optional(),
  grade: z.string().optional(),
  field: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  is_info_correct: z.boolean().optional(),
  favorites: z.boolean().optional(),
  meta: z.boolean().optional(),
  cell: z.any().optional(),
  profile_image: z.string().optional(),
});
