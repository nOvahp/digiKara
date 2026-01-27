import BASE_URL from './apiClient';
import { mockAuthService } from './mockAuthService';

const TOKEN_KEY = 'auth_token';
const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

interface OtpResponse {
  status: string;
  message: string;
  data: any[];
  code: number;
}

interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  national_code: string | null;
  meta: any | null;
  phone: string;
  school: string | null;
  field: string | null;
  province: string | null;
  city: string | null;
  district: string | null;
  grade: string | null;
}

interface OtpCheckResponse {
  status: string;
  message: string;
  data: {
    user: UserData;
    token: string;
  };
  code: number;
}

export const authService = {
 
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

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        console.error('Invalid response type:', contentType);
        console.error('Response:', text.substring(0, 500));
        return { success: false, message: 'Server returned invalid response. Check console for details.' };
      }

      const data: OtpResponse = await response.json();

      if (response.ok && data.code === 200 && data.status === "success") {
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

  
  verifyOtp: async (phone: string, code: string): Promise<{ success: boolean; token?: string; user?: UserData; message?: string }> => {
    if (USE_MOCK_BACKEND) {
      return mockAuthService.verifyOtp(phone, code) as any;
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

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        console.error('Invalid response type:', contentType);
        return { success: false, message: 'Server returned invalid response' };
      }

      const data: OtpCheckResponse = await response.json();

      if (response.ok && data.code === 200 && data.status === "success") {
        console.log('OTP verified successfully');
        const token = data.data.token;
        saveToken(token);
        return { 
          success: true, 
          token: token, 
          user: data.data.user
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

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        console.error('Invalid response type:', contentType);
        return { success: false, message: 'Server returned invalid response' };
      }

      const data = await response.json();

      if (response.ok) {
        const token = data.access_token;
        console.log(token);
        saveToken(token);
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
