import express from "express";
import { router } from "./router";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const app = express();
const port = 3000;

app.use(router);
app.listen(port, () => console.log(`Server is listening on port ${port}`));