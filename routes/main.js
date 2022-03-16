/** @format */
const express = require('express')
const main = express.Router()

main.get('/', async (req, res) => {
	res.send(`<h1 style='color:blue;'>CoderHouse!</h1>
            <h3 style='color: red; font-style:italic;'>Challenge 5 - Templates...
            <br/>
            <br/>
            <a href='/api/products/form' class="btn btn-primary mt-3 mb-0">Go to Product Form</a>`)
})

module.exports = main
