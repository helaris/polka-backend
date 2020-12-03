const mongoose = require('mongoose');
const User = require('../models/user');
const sharp = require("sharp");

const userBoard = (req, res) => {
  res.status(200).send({ message: "User authenticated woop" });
}

const getUser = async (req, res) => {
  let { id } = req.params;

  try {
    id = mongoose.Types.ObjectId(id);
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.send(error.message)
  }
}

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body)

  // TODO : Implement valdiation of what you are allowed to change
  // const allowedUpdates = ['firstName', 'lastName', 'interests', 'age']
  // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  // if (!isValidOperation) {
  // 		return res.status(400).send({ error: 'Invalid updates!' })
  // }
  try {
    let { id } = req.params;
    id = mongoose.Types.ObjectId(id);
    const user = await User.findById(id);
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
}

const getAllUsers = async (req, res) => {
  User.find((err, users) => {
    if (err) return console.error(err)
    res.json(users)
  })
}

const getImageFromUser = async (req, res) => {
  let { id } = req.params;

  try {
    id = mongoose.Types.ObjectId(id);
    const user = await User.findById(id);
    res.status(200)
    res.send(user.avatar)
  } catch (error) {
    console.log(error);
  }
}

const addUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body

  try {
    const user = new User({
      username,
      password,
      firstName,
      lastName,
      chats: [],
      groups: [],
      events: [],
      friends: [],
    })

    await user.save()

    res.statusCode(200).json(user);
  } catch (error) {
    console.log(error);
    res.send(error.message)
  }
}

const getByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.find({ username: `${username}` });
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message)
    res.send(error.message);
  }

}

module.exports = {
  getUser,
  userBoard,
  addUser,
  getAllUsers,
  getImageFromUser,
  updateUser,
  getByUsername,
}
