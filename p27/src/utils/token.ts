
const TOKEN_KEY = 'jwt_token';
const EMAIL_KEY = 'user_email';

export const saveAuthData = (token: string, email: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
};


export const removeAuthData = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getEmail = (): string | null => {
  return localStorage.getItem(EMAIL_KEY);
};
