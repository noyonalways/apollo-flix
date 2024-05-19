import express, { Application } from "express";
import cors from "cors";

// local imports
import appRoutes from "./routes";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// application routes
app.use(appRoutes);

export default app;
