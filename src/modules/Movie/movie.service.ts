import { IMovie } from "./movie.interface";
import Movie from "./movie.model";

const create = (data: IMovie): Promise<IMovie> => {
  const movie = new Movie({ ...data });
  return movie.save();
};

const getAll = (): Promise<IMovie[]> => {
  return Movie.find({});
};

export default {
  create,
  getAll,
};
