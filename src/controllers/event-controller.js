const mongoose = require("mongoose")
const Event = require("../models/event")
const User = require("../models/user")


const addParticipant = async (req, res) => {
    const { eventId, userId } = req.body
    try {

        if (!eventId || !userId) {
            res.status(400).send("Error: missing property")
        }

        await Event.findByIdAndUpdate(
            eventId,
            { $addToSet: { participants: userId } },
            { useFindAndModify: false }
        )
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { events: eventId } },
            { useFindAndModify: false }
        )
        res.json(userId).status(201).end()
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

const deleteParticipant = async (req, res) => {
    const { eventId, userId } = req.body
    try {
        if (!eventId || !userId) {
            res.status(400).send("Error: missing property")
        }

        await Event.findByIdAndUpdate(
           eventId,
            { $pull: { participants: mongoose.Types.ObjectId(userId) } },
            { useFindAndModify: false }
        )

        await User.findByIdAndUpdate(
           userId,
            { $pull: { events: mongoose.Types.ObjectId(eventId) } },
            { useFindAndModify: false }
        )
        res.json(userId).status(201).end()
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

module.exports = {
    addParticipant,
    deleteParticipant,
}