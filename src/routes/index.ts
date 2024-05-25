import { Router } from "express";
import movieRoutes from "../modules/movie/movie.routes";

const router: Router = Router();

const modulesRoutes = [
  {
    path: "/movies",
    routes: movieRoutes,
  },
];

modulesRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
