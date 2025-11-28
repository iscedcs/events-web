import z from "zod";

export const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  displayPicture: z.string(),
  dob: z.string(),
  address: z.string(),
});
