const mongoose = require("mongoose")
const User = require("../models/user")
const Chat = require("../models/chat")
const Message = require("../models/message")

const createChat = async (req, res) => {
  let { name, membersIds } = req.body

  if (!membersIds || membersIds.length === 0) {
    res.status(400).send("No member id's provided")
  }

  membersIds = membersIds.map((id) => mongoose.Types.ObjectId(id))

  try {
    const chat = new Chat({
      name,
      members: membersIds,
    })

    // Should only save if adding chat id to users is successful
    await chat.save()

    membersIds.forEach(async (userId) => {
      await User.findByIdAndUpdate(
        userId,
        { $push: { chats: chat._id } },
        { useFindAndModify: false }
      )
    })

    res.json(chat).status(200).send(chat)
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
}

const addMessage = async (req, res) => {
  const { text, sender, timestamp, chatId } = req.body

  console.log(text, sender, chatId)

  if (!text || !sender || !timestamp || !chatId) {
    res.status(400).send("Error: missing property")
  }

  try {
    const message = new Message({
      text,
      sender: mongoose.Types.ObjectId(sender),
    })

    await message.save()

    await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: message } },
      { useFindAndModify: false }
    )
    res.json(message).status(200).end()
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
}

const getChatById = async (req, res) => {
  let { id } = req.params

  try {
    id = mongoose.Types.ObjectId(id);
    const chat = await Chat.findById(id)
      .populate('members')
      .populate({
        path: 'messages',
        model: 'Message',
        populate: {
          path: 'sender',
          model: 'User'
        }
      });
    res.status(200).json(chat);
  } catch(error) {
    console.log(error);
    res.send(error.message)
  }
}

const getChatsByUserId = async (req, res) => {
  let { id } = req.params;

  try {
    id = mongoose.Types.ObjectId(id)
    const chats = await User.findById(id).populate({
      path: "chats",
      model: "Chat",
      populate: {
        path: "members",
        model: "User",
      },
    })
    res.status(200).json(chats)
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
}

const deleteChat = async (req, res) => {
  let { id } = req.params

  try {
    id = mongoose.Types.ObjectId(id)
    const chat = await Chat.findByIdAndDelete(id);
    chat.members.forEach(async userId => {
      await User.findByIdAndUpdate(
        userId,       
        { $pull: { chats: id } },
        { useFindAndModify: false })
    })
    res.status(204).end();
  } catch(error) {
    console.log(error)
    res.send(error.message)
  }
}

module.exports = {
  createChat,
  addMessage,
  getChatById,
  getChatsByUserId,
  deleteChat
}
