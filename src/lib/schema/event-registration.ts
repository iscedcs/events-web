import z from "zod";

export const eventRegistrationFormSchema = z.object({
  name: z.string().min(2, { message: "Name should be more than 2 characters" }),
  email: z.email({
    message: "Email address is not valid.",
  }),
  eventId: z.string().optional(),
  eventName: z.string().optional(),
  userId: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  ticketId: z.string().optional(),
  displayPicture: z.string().optional(),
});
