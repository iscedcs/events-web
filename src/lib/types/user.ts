export interface UserSession {
  accessToken?: string;
  id: string;
  email: string;
  userType?: string;
  image?: string;
}

export interface UserProps extends UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  businessName: string;
  position: string;
  displayPicture: string;
  businessAddress: string;
  idNumber: string;
  identificationType: string;
  address: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
