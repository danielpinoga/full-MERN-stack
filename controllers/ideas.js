const express = require('express')
const { User } = require('../db/schema')
const router = express.Router()

router.post('/', (req, res) => {
  console.log("USER ID", req.params.userId)
  User.findById(req.params.userId).then((user) => {
    const newIdea = new Idea({})
    user.ideas.push(newIdea)
    user.save().then((user) => {
      console.log("SENDING RESPONSE", newIdea)
      res.json(newIdea)
    })
  })
})

module.exports = router