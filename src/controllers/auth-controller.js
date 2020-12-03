const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../config/auth.config")
const User = require("../models/user")

exports.signup = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      governmentId: req.body.governmentId,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      chats: [],
    })
    await user.save()
    res.status(201).send({ message: "User was registered successfully!" })
  } catch (err) {
    console.log(err)
    res.send(err.message)
  }
}

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (!user) {
      return res.status(404).send({ message: "User not found!" })
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      })
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    })

    // res.cookie('token', token).status(200).end();
    // console.log(token)
    // res.cookie('token', token, { httpOnly: true });
    // res.json({ token });

    res.status(200).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      governmentId: user.governmentId,
      username: user.username,
      email: user.email,
      accessToken: token,
    })
  })
}
