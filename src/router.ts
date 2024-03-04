import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).send("welcome to form api project");
})