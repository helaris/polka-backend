const express = require("express")
const Group = require("../models/group")
const { addMember, deleteMember } = require("../controllers/group-controller")
 
const router = new express.Router()

router.post("/", async (req, res) => {
  console.log(req.body)

  const { name, description } = req.body
  const group = new Group({
    name,
    description,
  })
  await group.save(function (err) {
    if (err) return console.error(err)
  })

  Group.find((err, groups) => {
    if (err) return console.error(err)
    res.send(groups)
  })
})

router.get("/", async (req, res) => {
  Group.find((err, groups) => {
    if (err) return console.error(err)
    res.send(groups)
  })
})

router.get("/:name", async (req, res) => {
  const searchQuery = req.params.name
  const data = await Group.find({ name: `${searchQuery}` })
  res.send(data)
})

router.put("/member", addMember)

router.put("/", deleteMember)


module.exports = router
