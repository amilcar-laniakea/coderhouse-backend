/** @format */

const express = require('express')
const app = express()
const PORT = 8080
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { routerProducts, product } = require('./routes/products')
const main = require('./routes/main')

const server = httpServer.listen(PORT, () => {
	console.log(`server up and listen in port... ${server.address().port}`)
})
server.on('error', (error) => console.log(`Server has an error: ${error}`))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/products', routerProducts)
app.use('/', main)

const { Chat } = require('./class/chat')

io.on('connection', (socket) => {
	console.log(`user with id: ${socket.id} - is conected`)
	const chatMessajes = new Chat(`history-chat.txt`)
	const request = chatMessajes.getAll()
	socket.emit('messages', request)
	socket.emit('products', product.products)
	socket.on('new-message', (data) => {
		const request = chatMessajes.save(data)
		io.sockets.emit('messages', request)
	})

	socket.on('new-product', (data) => {
		result = product.saveSocket(data)
		io.sockets.emit('products', product.products)
	})
})
