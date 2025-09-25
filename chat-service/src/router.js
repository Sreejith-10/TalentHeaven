import express from "express";
import {sendMessage} from "./controller/sendMessage.js";
import {addToChatList} from "./controller/addToChatList.js";
import {getChatList} from "./controller/getChatList.js";
import {getChat} from "./controller/getChats.js";

const router = express.Router();

router.get("/get-chats/:id", getChat);
router.get("/get-chatlist/:id", getChatList);
router.post("/add-to-chat", addToChatList);
router.post("/send-message", sendMessage);

export default router;
