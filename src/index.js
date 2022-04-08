/** @format */
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 7070

const routerProducts = require('./routes/products')
const main = require('./routes/main')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/products', routerProducts)
app.use('/', main)

const server = app.listen(PORT, () => {
	console.log(`server up and listen in port... ${server.address().port}`)
})
server.on('error', (error) => console.log(`Server has an error: ${error}`))
