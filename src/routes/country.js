const express = require("express")
const Country = require("../models/country")

const router = new express.Router()

router.post("/norway", async (req, res) => {
  console.log(req.body)

  const country = new Country({
    name: req.body.name,
    description: "land in the North",
    ally: true,
  })
  await country.save(function (err, country) {
    if (err) return console.error(err)
    console.log("Saving to db: ", country)
  })

  Country.find((err, countries) => {
    if (err) return console.error(err)
    res.send(countries)
  })
})

router.get("/norway", async (req, res) => {
  Country.find((err, countries) => {
    if (err) return console.error(err)
    res.send(countries)
  })
})

module.exports = router
