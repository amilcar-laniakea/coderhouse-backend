/** @format */
const express = require('express')
const { response } = require('../functions/response')
const main = express.Router()

main.get('/', async (req, res) => {
	res.send(`<div style='text-align:center; margin-top: 50px'>
              <h1 style='color:blue;'>CoderHouse Backend!</h1>
              <h3 style='color: red; font-style:italic;'>First delivery - Final Proyect...
              <br/>
              <br/>
              <span mt-3 mb-0" style='font-style: normal;color: #000;'>Nothing to do here - use Postman for test endpoints.</span>
            </div>
            `)
})

main.get('*', function (req, res) {
	return res.json(response('404', '', `route: ${req.url} is not autorized...`, 'not found'))
})

module.exports = main
