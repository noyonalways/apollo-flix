import { z } from "zod";

const reviewSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email is must be string",
    })
    .email({ message: "provide a valid email address" }),
  rating: z
    .number({
      required_error: "rating is required",
      invalid_type_error: "rating is must be number",
    })
    .min(0)
    .max(5),
  comment: z.string({
    required_error: "comment is required",
    invalid_type_error: "comment is must be string",
  }),
});

const movieSchema = z
  .object({
    title: z
      .string({
        required_error: "title is required",
        invalid_type_error: "title is must be string",
      })
      .min(1, "title must more than 1 characters"),
    description: z
      .string({
        required_error: "description is required",
        invalid_type_error: "description is must be string",
      })
      .min(15, "description must be more than 15 characters"),
    releaseDate: z
      .string({
        required_error: "releaseDate is required",
        invalid_type_error: "releaseDate is must be string",
      })
      .min(5, "releaseDate must be grater than 5 characters"),
    genre: z
      .string({
        required_error: "genre is required",
        invalid_type_error: "genre is must be string",
      })
      .min(3, "genre must be grater than 3 characters"),
    isDeleted: z
      .boolean({
        invalid_type_error: "isDeleted is must be boolean",
      })
      .optional()
      .default(false),
    viewCount: z
      .number({
        invalid_type_error: "viewCount is must be number",
      })
      .optional()
      .default(0),
    reviews: z.array(reviewSchema).optional(),
  })
  .strict();

export default movieSchema;
