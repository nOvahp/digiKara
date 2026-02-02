
const TOKEN_KEY = 'auth_token';

export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    // Set cookie for middleware access if needed
    document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict`;
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
    document.cookie = `token=; path=/; max-age=0; SameSite=Strict`;
  }
};
