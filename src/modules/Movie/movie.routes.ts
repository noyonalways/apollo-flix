import { Router } from "express";
import movieController from "./movie.controller";

const router: Router = Router();

router.route("/").post(movieController.create).get(movieController.getAll);

export default router;
