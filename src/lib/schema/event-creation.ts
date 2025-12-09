import { format, isBefore, isSameDay, parse } from "date-fns";
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
			.min(3, "Event location must be at least 3 characters long")
			.max(200, "Location is too long"),
		image: z
			.string()
			.url("Please provide a valid image URL")
			.optional()
			.or(z.literal("")),
		title: z
			.string()
			.min(3, "Event title must be at least 3 characters long")
			.max(100, "Title is too long"),
		host: z
			.string()
			.min(2, "Host name must be at least 2 characters long")
			.max(100, "Host name is too long"),
		description: z
			.string()
			.min(10, "Event description must be at least 10 characters long"),
		latitude: z.number().refine((val) => val >= -90 && val <= 90, {
			message: "Latitude must be between -90 and 90",
		}),
		longitude: z.number().refine((val) => val >= -180 && val <= 180, {
			message: "Longitude must be between -180 and 180",
		}),
		capacity: z
			.number()
			.int("Capacity must be a whole number")
			.positive("Capacity must be greater than 0"),
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
			.refine(
				(val) => !isNaN(Date.parse(val)),
				"Event start date is not valid"
			)
			.refine((val) => {
				const selected = new Date(val);
				const now = new Date();
				return isBefore(now, selected);
			}, "Start date must be in the future"),
		endDate: z
			.string()
			.refine(
				(val) => !isNaN(Date.parse(val)),
				"Event end date is not valid"
			)
			.refine((val) => {
				const selected = new Date(val);
				const now = new Date();
				return isBefore(now, selected);
			}, "End date must be in the future"),
		time: z.string().min(2, "Event time is not valid"),
		endTime: z.string().min(2, "Event end time is not valid"),
		tickets: z
			.array(
				z
					.object({
						title: z
							.string()
							.min(
								2,
								"Ticket title must be at least 2 characters long"
							)
							.max(100, "Ticket title is too long"),
						quantity: z
							.number()
							.int("Quantity must be a whole number")
							.positive("Quantity must be greater than 0"),
						isFree: z.boolean(),
						amount: z
							.number()
							.nonnegative("Amount cannot be negative")
							.refine(
								(val) => val >= 0,
								"Amount must be 0 or higher"
							),
						currency: z
							.string()
							.min(
								3,
								"Currency must be at least 3 characters (e.g. USD)"
							)
							.max(5, "Invalid currency code"),
					})
					.nullable()
			)
			.optional(),
	})
	.refine(
		(data) => {
			const start = new Date(data.startDate);
			const end = new Date(data.endDate);
			return end >= start;
		},
		{
			message: "End date cannot be before start date",
			path: ["endDate"],
		}
	)
	.refine(
		(data) => {
			const now = new Date();

			const start = data.startDate;
			const end = data.endDate;

			const eventTime = parse(data.time, "h:mm a", new Date());

			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (isBefore(start, today)) {
				return false;
			}

			if (isSameDay(start, now)) {
				if (isBefore(eventTime, now)) {
					return false;
				}
			}

			if (isBefore(end, start)) {
				return false;
			}

			return true;
		},
		{
			message: "Event cannot be in the past.",
			path: ["time"],
		}
	)
	.refine((data) => data.tickets && data.tickets.length > 0, {
		message: "Event must have one or more tickets",
		path: ["tickets"],
	});

export const eventEditSchema = z
	.object({
		hasFreeTickets: z.boolean().optional(),
		location: z
			.string()
			.min(3, "Event location must be at least 3 characters long")
			.max(200, "Location is too long")
			.optional(),
		image: z
			.string()
			.url("Please provide a valid image URL")
			.optional()
			.or(z.literal(""))
			.optional(),
		title: z
			.string()
			.min(3, "Event title must be at least 3 characters long")
			.max(100, "Title is too long")
			.optional(),
		host: z
			.string()
			.min(2, "Host name must be at least 2 characters long")
			.max(100, "Host name is too long")
			.optional(),
		description: z
			.string()
			.min(10, "Event description must be at least 10 characters long")
			.optional(),

		latitude: z
			.number()
			.refine((val) => val >= -90 && val <= 90, {
				message: "Latitude must be between -90 and 90",
			})
			.optional(),

		longitude: z
			.number()
			.refine((val) => val >= -180 && val <= 180, {
				message: "Longitude must be between -180 and 180",
			})
			.optional(),

		capacity: z
			.number()
			.int("Capacity must be a whole number")
			.positive("Capacity must be greater than 0")
			.optional(),

		categories: z
			.array(z.string().min(1, "Category cannot be empty"))
			.min(1, "Select at least one category")
			.optional(),

		isPublic: z.boolean().optional(),

		town: z
			.string()
			.min(2, "Town name must be at least 2 characters long")
			.max(100, "Town name is too long")
			.optional(),

		startDate: z
			.string()
			.refine(
				(val) => !val || !isNaN(Date.parse(val)),
				"Event start date is not valid"
			)
			.optional(),

		endDate: z
			.string()
			.refine(
				(val) => !val || !isNaN(Date.parse(val)),
				"Event end date is not valid"
			)
			.optional(),

		time: z.string().optional(),
		endTime: z.string().optional(),

		tickets: z
			.array(
				z
					.object({
						title: z
							.string()
							.min(
								2,
								"Ticket title must be at least 2 characters long"
							)
							.max(100, "Ticket title is too long"),
						quantity: z
							.number()
							.int("Quantity must be a whole number")
							.positive("Quantity must be greater than 0"),
						isFree: z.boolean(),
						amount: z
							.number()
							.nonnegative("Amount cannot be negative")
							.refine(
								(val) => val >= 0,
								"Amount must be 0 or higher"
							),
						currency: z
							.string()
							.min(
								3,
								"Currency must be at least 3 characters (e.g. USD)"
							)
							.max(5, "Invalid currency code"),
					})
					.nullable()
			)
			.optional(),
	})
	// Validate only if both dates exist
	.refine(
		(data) =>
			!data.startDate ||
			!data.endDate ||
			new Date(data.endDate) >= new Date(data.startDate),
		{
			path: ["endDate"],
			message: "End date cannot be before start date",
		}
	);
