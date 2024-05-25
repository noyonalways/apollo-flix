import { NextFunction, Request, Response } from "express";
import { IMovie } from "./movie.interface";
import movieService from "./movie.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie: IMovie = await movieService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movies: IMovie[] = await movieService.getAll();
    res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      count: movies.length,
      data: movies,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  getAll,
};
