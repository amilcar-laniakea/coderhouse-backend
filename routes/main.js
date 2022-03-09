/** @format */
const express = require('express')
const main = express.Router()

main.get('/hello', async (req, res) => {
	res.send(`<h1 style='color:blue;'>CoderHouse!</h1>
            <h3 style='color: red; font-style:italic;'>Challenge 4 - Advanced Express server...`)
})

module.exports = main
