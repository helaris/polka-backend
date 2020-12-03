const express = require("express")

const router = express.Router()
const { verifyToken } = require("../middleware/authJwt")
const { userBoard, getUser, addUser, getAllUsers, updateUser, getImageFromUser, getByUsername, uploadImage } = require("../controllers/user-controller")
const sharp = require("sharp");
const User = require('../models/user')
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be a Word doc"))
    }
    cb(undefined, true)

  }
})

router.post("/avatar/:id", upload.single("avatar"), async (req, res) => {
  let { id } = req.params
  const buffer =
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer()

  const user = await User.findById(id)
  user.avatar = buffer
  await user.save();
  res.send(req.body)
})

router.post("/image/:id", async (req, res) => {
  let { id } = req.params;

  console.log(req.url)
  const user = await User.findById(id);
  user.image = req.body.url_string
  await user.save()
  res.send();
})

router.get('/avatar/:id', async (req, res) => {
  let { id } = req.params
  const user = User.findById(id)
  res.contentType('json');
  res.send(user.avatar);
})

router.get("/", verifyToken, userBoard)
router.get('/image/:id', getImageFromUser)
router.patch("/:id", updateUser)
router.get("/all", getAllUsers);
router.get('/:id', getUser);
router.post("/user", addUser);
router.get("/profile/:username", getByUsername);

module.exports = router
