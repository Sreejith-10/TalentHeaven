import express from "express";
import {getNotifications} from "./controller/getNotifications.js";

const router = express.Router();

router.get("/get-notifications/:id", getNotifications);

export default router;
