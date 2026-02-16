// Mock auth service for testing without backend

import { id } from 'zod/v4/locales';

export const testOtp = '12345';

interface UserData {
  name: string;
  phone: string;
  school: string;
  city: string;
  field: string;
  grade: string;
}

export const mockAuthService = {
  requestOtp: async (
    phone: string,
  ): Promise<{
    success: boolean;
    message?: string;
    data?: any[];
    code?: number;
    status?: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('mockPhone', phone);
        localStorage.setItem('mockOtp', testOtp);

        const response = {
          success: true,
          status: 'success',
          message: 'کد تایید ارسال شد',
          data: [],
          code: 200,
        };

        console.group('🔐 Mock OTP Request');
        console.log('📱 Request:');
        console.table({ phone });
        console.log('✅ Response:', response);
        console.log('📝 Test OTP for next step: 12345');
        console.log('💾 Stored in localStorage:', {
          mockPhone: phone,
          mockOtp: testOtp,
        });
        console.groupEnd();

        resolve(response);
      }, 500);
    });
  },

  verifyOtp: async (
    phone: string,
    code: string,
  ): Promise<{
    success: boolean;
    token?: string;
    user?: UserData;
    message?: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const correctOtp = localStorage.getItem('mockOtp');
        const storedPhone = localStorage.getItem('mockPhone');

        console.group('🔐 Mock OTP Verification');
        console.log('📱 Request:');
        console.table({ phone, code });

        if (code === correctOtp && phone === storedPhone) {
          const mockUser: UserData = {
            name: 'علی رضائی',
            phone: phone,
            school: 'دبیرستان نمونه',
            city: 'تهران',
            field: 'ریاضی',
            grade: '11',
          };
          const mockToken = 'mock_token_' + Date.now();

          const response = {
            success: true,
            token: mockToken,
            user: mockUser,
          };

          console.log('✅ OTP Verified!');
          console.log('👤 User Data:');
          console.table(mockUser);
          console.log('🔑 Token:', mockToken);
          console.log('✅ Full Response:');
          console.table(response);

          localStorage.removeItem('mockOtp');
          localStorage.removeItem('mockPhone');
          console.log('🧹 Cleared localStorage (mockOtp, mockPhone)');
          console.groupEnd();

          resolve(response);
        } else {
          const response = {
            success: false,
            message: `Invalid OTP. Expected: ${correctOtp}, Got: ${code}`,
          };

          console.log('❌ OTP Verification Failed!');
          console.log('Expected OTP:', correctOtp);
          console.log('Received OTP:', code);
          console.log('❌ Response:', response);
          console.groupEnd();

          resolve(response);
        }
      }, 500);
    });
  },

  login: async (
    phoneNumber: string,
    password: string,
  ): Promise<{
    success: boolean;
    token?: string;
    user?: UserData;
    message?: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.group('🔐 Mock Login');
        console.log('📱 Request:');
        console.table({ phoneNumber, password });

        if (password === 'test123') {
          const mockToken = 'mock_token_' + Date.now();
          const response = {
            success: true,
            token: mockToken,
          };

          console.log('✅ Login Successful!');
          console.log('🔑 Token:', mockToken);
          console.log('✅ Response:');
          console.table(response);
          console.groupEnd();

          resolve(response);
        } else {
          const response = {
            success: false,
            message: 'Invalid password. Try: test123',
          };

          console.log('❌ Login Failed!');
          console.log('❌ Response:', response);
          console.groupEnd();

          resolve(response);
        }
      }, 500);
    });
  },
};
