export interface IAuthResponse {
  data: {
    id: string;
    email: string;
    userType: string;
    accessToken: string;
  };
}
