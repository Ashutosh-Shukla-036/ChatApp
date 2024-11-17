import express from "express";
import { getMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/messages/:sender/:recipient", getMessage);

export default router;
