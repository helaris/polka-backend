const express = require("express")

const router = express.Router()
const { signin } = require("../controllers/auth-controller")

router.post("/", (req, res) => {
  console.log(req.cookies)
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  signin(req, res)
})

module.exports = router
