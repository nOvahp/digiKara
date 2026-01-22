import BASE_URL from './apiClient';
import { mockAuthService } from './mockAuthService';

// Toggle this to switch between mock and real backend
const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

interface OtpResponse {
  message: string;
  statusCode: number;
}

interface UserData {
  name: string;
  phone: string;
  school: string;
  city: string;
  field: string;
  grade: string;
}

interface OtpCheckResponse {
  data: UserData & {
    token: string;
  };
  message: string;
  statusCode: number;
}

export const authService = {
  // Request OTP code
  requestOtp: async (phone: string): Promise<{ success: boolean; message?: string }> => {
    if (USE_MOCK_BACKEND) {
      return mockAuthService.requestOtp(phone);
    }
    
    try {
      const response = await fetch(`${BASE_URL}/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: String(phone),
        }),
      });

      const data: OtpResponse = await response.json();

      if (response.ok && data.statusCode === 200) {
        console.log('OTP requested successfully:', data.message);
        return { 
          success: true, 
          message: data.message 
        };
      } else {
        return { 
          success: false, 
          message: data.message || 'Failed to request OTP' 
        };
      }
    } catch (error) {
      console.error('Request OTP error:', error);
      console.error('BASE_URL:', BASE_URL);
      return { success: false, message: error instanceof Error ? error.message : 'Network error' };
    }
  },

  // Verify OTP code
  verifyOtp: async (phone: string, code: string): Promise<{ success: boolean; token?: string; user?: UserData; message?: string }> => {
    if (USE_MOCK_BACKEND) {
      return mockAuthService.verifyOtp(phone, code);
    }
    
    try {
      const response = await fetch(`${BASE_URL}/otp/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: String(phone),
          code: String(code),
        }),
      });

      const data: OtpCheckResponse = await response.json();

      if (response.ok && data.statusCode === 200) {
        console.log('OTP verified successfully');
        return { 
          success: true, 
          token: data.data.token, 
          user: {
            name: data.data.name,
            phone: data.data.phone,
            school: data.data.school,
            city: data.data.city,
            field: data.data.field,
            grade: data.data.grade,
          }
        };
      } else {
        return { 
          success: false, 
          message: data.message || 'Invalid OTP code' 
        };
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  // Legacy login method (kept for backward compatibility)
  login: async (phoneNumber: string, password: string): Promise<{ success: boolean; token?: string; user?: UserData; message?: string }> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: String(phoneNumber),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.access_token;
        console.log(token)
        return { 
          success: true, 
          token: token, 
        };
      } else {
        return { 
          success: false, 
          message: data.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error' };
    }
  },
};
