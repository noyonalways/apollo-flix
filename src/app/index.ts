import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import "colors";

// local imports
import appRoutes from "./routes";

const app: Application = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// application routes
app.use(appRoutes);

export default app;
