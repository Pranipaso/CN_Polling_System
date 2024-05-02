import { home } from "../controllers/home_controller.js";
import questionRoute from "./questions.js";
import optionRoute from "./options.js";
import express from "express";
const router = express.Router();

router.get("/", home);
router.use("/questions", questionRoute);
router.use("/options", optionRoute);

export default router;
