import { Schema, model } from "mongoose";
import { IMovie, IReview } from "./movie.interface";

const reviewSchema = new Schema<IReview>({
  email: { type: String },
  rating: { type: Number },
  comment: { type: String },
});

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
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

const Movie = model("Movie", movieSchema);
export default Movie;
