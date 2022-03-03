/** @format */

const express = require('express')

const app = express()

const PORT = 8080

const { Container } = require('./class')

const server = app.listen(PORT, () => {
	console.log(`server up and listen in port... ${server.address().port}`)
})

const container = new Container(`productos.txt`)

app.get('/', (req, res) => {
	res.send(`<h1 style='color:blue;'>Hi node server...!</h1>
            <h3 style='color: red; font-style:italic;'>Challenge 3 - Express basic server`)
})

app.get('/productos', (req, res) => {
	const request = container.getAll()
	res.json(request)
})

app.get('/productoRandom', (req, res) => {
	const requestAll = container.getAll()
	const lol = Math.floor(Math.random() * (requestAll.length - 1 + 1) + 1)
	const request = container.getById(lol)
	res.json(request)
})
