
const TOKEN_KEY = 'jwt_token';
const EMAIL_KEY = 'user_email';
const USER_ID_KEY = 'user_id';

export const saveAuthData = (token: string, email: string, userId?: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
  if (userId) {
    localStorage.setItem(USER_ID_KEY, userId);
  }
};


export const removeAuthData = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getEmail = (): string | null => {
  return localStorage.getItem(EMAIL_KEY);
};

export const getUserId = (): string | null => {
  return localStorage.getItem(USER_ID_KEY);
};
