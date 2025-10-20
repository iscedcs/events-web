export interface UserInfo {
  id?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  displayPicture?: string;
  userType?: string;
  iat?: number;
  exp?: number;
}

export interface AuthInfo {
  accessToken: string;
  user: UserInfo;
  expiresAt: number;
  isExpired: boolean;
  willExpireAt: string | null;
}

export interface AuthError {
  error: string;
  accessToken?: never;
  user?: never;
}

export type AuthHeaderType = {
  loading: boolean;
  message: string;
  linkText?: string;
  onClick?: () => void;
};

export interface JwtPayload {
  userId: string;
  exp: number;
  iat: number;
}
