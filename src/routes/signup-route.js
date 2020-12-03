const express = require("express")

const router = express.Router()
const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignUp")
const { signup } = require("../controllers/auth-controller")

router.post("/", checkDuplicateUsernameOrEmail, (req, res) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  signup(req, res)
})

module.exports = router
