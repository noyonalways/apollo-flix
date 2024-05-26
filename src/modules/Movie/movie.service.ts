import { isValidObjectId } from "mongoose";
import { IMovie } from "./movie.interface";
import Movie from "./movie.model";
import { customError } from "../../utils";

// create a movie
const create = (data: IMovie) => {
  const movie = new Movie({ ...data });
  return movie.save();
};

// get all movies
const getAll = () => {
  return Movie.find({});
};

// find movie by property
const findByProperty = (key: string, value: string) => {
  if (key === "_id") {
    if (!isValidObjectId(value)) {
      throw customError(false, 400, "Invalid id");
    }
    return Movie.findById(value);
  }
  return Movie.findOne({ [key]: value });
};

// update single movie
const updateSingle = async (id: string, data: IMovie) => {
  if (!isValidObjectId(id)) {
    throw customError(false, 400, "Invalid id");
  }

  const updatedMovie = await Movie.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedMovie) {
    throw customError(false, 404, "Movie not found");
  }

  return updatedMovie;
};

// delete single movie
const deleteSingle = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw customError(false, 400, "Invalid id");
  }

  const deletedMovie = await Movie.findByIdAndDelete(id);

  if (!deletedMovie) {
    throw customError(false, 404, "Movie not found");
  }

  return null;
};

export default {
  create,
  getAll,
  findByProperty,
  updateSingle,
  deleteSingle,
};
