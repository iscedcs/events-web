import z from "zod";

export const eventCreationSchema = z.object({
  location: z.string(),
  image: z.string(),
  title: z.string(),
  host: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  audienceSize: z.number(),
  categories: z.array(z.string()),
  isPublic: z.boolean(),
  town: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  time: z.string(),
  tickets: z.array(
    z
      .object({
        title: z.string(),
        quantity: z.number(),
        isFree: z.boolean(),
        amount: z.number(),
        currency: z.string(),
      })
      .nullable()
  ),
});
