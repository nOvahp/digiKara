
import { z } from "zod";

// --- API Response Types ---
export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

// --- User Data Types ---
export interface UserData {
  id?: number;
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
  // Add other fields as per your API response
}

// --- Zod Schemas ---
export const UserSchema = z.object({
    id: z.number().optional(),
    phone: z.string(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    national_code: z.string().optional(),
    // Add validation rules
});
