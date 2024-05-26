import { NextFunction, Request, Response } from "express";
import { IMovie } from "./movie.interface";
import movieService from "./movie.service";
import movieSchema from "./movie.validation";
import { formatErrors, sendResponse } from "../../utils";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { success, error, data } = movieSchema.safeParse(req.body);

    if (!success) {
      const formattedErrors = formatErrors(error);
      return res.status(400).json({
        success: false,
        message: formattedErrors,
      });
    }

    const movie = await movieService.create(data as IMovie);
    sendResponse(res, {
      statusCode: 201,
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
    // TODO: handle query parameter search
    const movies = await movieService.getAll();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await movieService.findByProperty("_id", id);

    if (!movie) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Movie not found",
        data: undefined,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Movie fetched successfully",
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

const updateSingle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { success, error, data } = movieSchema.partial().safeParse(req.body);

    if (!success) {
      const formattedErrors = formatErrors(error);
      return res.status(400).json({
        success: false,
        message: formattedErrors,
      });
    }

    const updatedMovie = await movieService.updateSingle(id, data as IMovie);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const deletedMovie = await movieService.deleteSingle(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Movie deleted successfully",
      data: deletedMovie,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
