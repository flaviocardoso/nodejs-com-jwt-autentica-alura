const express = requre('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

module.exports = app