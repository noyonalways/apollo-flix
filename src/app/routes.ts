import { Router } from "express";
import allRoutes from "../routes";
import { globalErrorHandler, notFoundErrorHandler } from "./error.handler";
const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// all routes
router.use("/api/v1", allRoutes);

// not found error handler
router.use(notFoundErrorHandler);

// global error handler
router.use(globalErrorHandler);

export default router;
