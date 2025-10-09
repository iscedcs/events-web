import z from "zod";

export const eventCreationSchema = z.object({
  location: z.string(),
  image: z.string(),
  title: z.string(),
});
