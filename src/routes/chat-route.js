const express = require("express")

const {
  createChat,
  addMessage,
  getChatById,
  getChatsByUserId,
  deleteChat
} = require("../controllers/chat-controller")

const router = express.Router()

router.post("/", createChat)

router.put("/message", addMessage)

router.get("/:id", getChatById)

router.get("/user/:id", getChatsByUserId)

router.delete("/:id", deleteChat)

module.exports = router
