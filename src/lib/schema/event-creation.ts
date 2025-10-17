import z from "zod";

// export const eventCreationSchema = z.object({
//   location: z.string(),
//   image: z.string(),
//   title: z.string(),
//   host: z.string(),
//   description: z.string(),
//   latitude: z.number(),
//   longitude: z.number(),
//   audienceSize: z.number(),
//   categories: z.array(z.string()),
//   isPublic: z.boolean(),
//   town: z.string(),
//   startDate: z.string(),
//   endDate: z.string(),
//   time: z.string(),
//   tickets: z.array(
//     z
//       .object({
//         title: z.string(),
//         quantity: z.number(),
//         isFree: z.boolean(),
//         amount: z.number(),
//         currency: z.string(),
//       })
//       .nullable()
//   ),
// });

export const eventCreationSchema = z
  .object({
    hasFreeTickets: z.boolean(),
    location: z
      .string()
      .min(3, "Location must be at least 3 characters long")
      .max(200, "Location is too long"),
    image: z
      .string()
      .url("Please provide a valid image URL")
      .optional()
      .or(z.literal("")), // allow empty if optional
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title is too long"),
    host: z
      .string()
      .min(2, "Host name must be at least 2 characters long")
      .max(100, "Host name is too long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .max(1000, "Description is too long"),
    latitude: z.number().refine((val) => val >= -90 && val <= 90, {
      message: "Latitude must be between -90 and 90",
    }),
    longitude: z.number().refine((val) => val >= -180 && val <= 180, {
      message: "Longitude must be between -180 and 180",
    }),
    audienceSize: z
      .number()
      .int("Audience size must be a whole number")
      .positive("Audience size must be greater than 0")
      .max(1000000, "Audience size is unrealistically large"),
    categories: z
      .array(z.string().min(1, "Category cannot be empty"))
      .min(1, "Select at least one category"),
    isPublic: z.boolean(),
    town: z
      .string()
      .min(2, "Town name must be at least 2 characters long")
      .max(100, "Town name is too long"),
    startDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
    endDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid end date"),
    time: z.string().min(2, "Invalid time format"),
    tickets: z
      .array(
        z
          .object({
            title: z
              .string()
              .min(2, "Ticket title must be at least 2 characters long")
              .max(100, "Ticket title is too long"),
            quantity: z
              .number()
              .int("Quantity must be a whole number")
              .positive("Quantity must be greater than 0"),
            isFree: z.boolean(),
            amount: z
              .number()
              .nonnegative("Amount cannot be negative")
              .refine((val) => val >= 0, "Amount must be 0 or higher"),
            currency: z
              .string()
              .min(3, "Currency must be at least 3 characters (e.g. USD)")
              .max(5, "Invalid currency code"),
          })
          .nullable()
      )
      .optional(),
  })
  .refine(
    (data) => {
      // Ensure end date is after start date
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) =>
      data.tickets?.every(
        (ticket) => ticket?.isFree || (ticket && ticket.amount > 0)
      ),
    {
      message: "Paid tickets must have an amount greater than 0",
      path: ["tickets"],
    }
  );
