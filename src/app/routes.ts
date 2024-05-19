import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export default router;
