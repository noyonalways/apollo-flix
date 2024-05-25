import { isValidObjectId } from "mongoose";
import { IMovie } from "./movie.interface";
import Movie from "./movie.model";
import { customError } from "../../utils";

const create = (data: IMovie) => {
  const movie = new Movie({ ...data });
  return movie.save();
};

const getAll = () => {
  return Movie.find({});
};

const findByProperty = (key: string, value: string) => {
  if (key === "_id") {
    if (!isValidObjectId(value)) {
      throw customError(false, 400, "Invalid id");
    }
    return Movie.findById(value);
  }
  return Movie.findOne({ [key]: value });
};

export default {
  create,
  getAll,
  findByProperty,
};
