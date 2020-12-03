const mongoose = require("mongoose")
const Group = require("../models/group")
const User = require("../models/user")

const addMember = async (req, res) => {
    const { groupId, userId } = req.body
    try {

        if (!groupId || !userId) {
            res.status(400).send("Error: missing property")
        }

        await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } },
            { useFindAndModify: false }
        )
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { groups: groupId } },
            { useFindAndModify: false }
        )
        res.json(userId).status(201).end()
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

const deleteMember = async (req, res) => {
    const { groupId, userId } = req.body
    try {
        if (!groupId || !userId) {
            res.status(400).send("Error: missing property")
        }

        await Group.findByIdAndUpdate(
            groupId,
            { $pull: { members: mongoose.Types.ObjectId(userId) } },
            { useFindAndModify: false }
        )

        await User.findByIdAndUpdate(
           userId,
            { $pull: { groups: mongoose.Types.ObjectId(groupId) } },
            { useFindAndModify: false }
        )
        res.json(userId).status(201).end()
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

module.exports = {
    addMember,
    deleteMember,
}