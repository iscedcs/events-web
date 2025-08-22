import z from "zod";

export const eventRegistrationFormSchema = z.object({
  name: z.string().min(2, { message: "Name should be more than 2 characters" }),
  email: z.email({
    message: "Email address is not valid.",
  }),
});
