import { NextFunction, Request, Response } from "express";
import { IMovie } from "./movie.interface";
import movieService from "./movie.service";
import { sendResponse } from "../../utils";
import movieSchema from "./movie.validation";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { success, error, data } = movieSchema.safeParse(req.body);

    if (!success) {
      const formattedErrors = error.issues.reduce(
        (acc: Record<string, string>, issue) => {
          if (issue.code === "unrecognized_keys") {
            issue.keys.forEach((key) => {
              acc[key] = `Unrecognized key: '${key}'`;
            });
          } else {
            acc[issue.path.join(".")] = issue.message;
          }
          return acc;
        },
        {},
      );

      return res.status(400).json({
        success: false,
        message: formattedErrors,
      });
    }

    const movie: IMovie = await movieService.create(data as IMovie);
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
    const movies: IMovie[] = await movieService.getAll();
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

export default {
  create,
  getAll,
};
