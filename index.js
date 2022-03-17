/** @format */

const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const PORT = 8080

const routerProducts = require('./routes/products')
const main = require('./routes/main')

const server = app.listen(PORT, () => {
	console.log(`server up and listen in port... ${server.address().port}`)
})
server.on('error', (error) => console.log(`Server has an error: ${error}`))

app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
  })
)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/products', routerProducts)
app.use('/', main)
