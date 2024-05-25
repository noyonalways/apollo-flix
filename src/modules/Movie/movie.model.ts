import { Schema, model } from "mongoose";
import { IMovie, IReview } from "./movie.interface";

const reviewSchema = new Schema<IReview>({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  rating: {
    type: Number,
    required: [true, "ratting is required"],
  },
  comment: {
    type: String,
    required: [true, "comment is required"],
  },
});

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  releaseDate: {
    type: String,
    required: [true, "releaseDate is required"],
  },
  genre: {
    type: String,
    required: [true, "genre is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [reviewSchema],
  },
});

movieSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Movie = model<IMovie>("Movie", movieSchema);
export default Movie;
