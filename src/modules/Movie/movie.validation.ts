import { z } from "zod";

const movieSchema = z
  .object({
    title: z
      .string({
        required_error: "title is required",
        invalid_type_error: "title must be string",
      })
      .min(1, "title must be more than 1 characters"),
    description: z
      .string({
        required_error: "description is required",
        invalid_type_error: "description must be string",
      })
      .min(15, "description must be more than 15 characters"),
    releaseDate: z.date({
      required_error: "releaseDate is required",
      invalid_type_error: "releaseDate is not a valid date", // Adjust error message if needed
    }),
    genre: z
      .string({
        required_error: "genre is required",
        invalid_type_error: "genre must be string",
      })
      .min(3, "genre must be grater than 3 characters"),
    isDeleted: z
      .boolean({
        invalid_type_error: "isDeleted must be boolean",
      })
      .optional()
      .default(false),
    viewCount: z
      .number({
        invalid_type_error: "viewCount must be number",
      })
      .optional()
      .default(0),
    // Optional fields (if needed for validation)
    slug: z.string().optional(),
    totalRating: z.number().optional(),
  })
  .strict();

export default movieSchema;
