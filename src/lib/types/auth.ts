export interface IAuthResponse {
  data: {
    id: string;
    email: string;
    userType: string;
    accessToken: string;
  };
}

export type CountdownCallback = (minutes: number, seconds: number) => void;
export type CountdownEndCallback = () => void;

export type userType = "USER" | "BUSINESS_USER";

export type AuthHeaderType = {
  message: string;
  link?: string;
  linkText?: string;
  hasLink: boolean;
};
