/** @format */
const express = require('express')
const { Products } = require('../class/products')
const { uploadImage } = require('../functions/uploadImage')
const { response } = require('../functions/response')
const { handleAccess } = require('../functions/auth')

const routerProducts = express.Router()
const product = new Products([])

routerProducts.use(handleAccess)

routerProducts.get('/form', async (req, res) => {
	res.render('products-create')
})

routerProducts.get('/', async (req, res) => {
	console.log('lol...', req.body.administrator)
	const result = await product.getAll()
	//return res.render('products-list', { products: result.data } )
	return res.json(result)
})

routerProducts.get('/:id', async (req, res) => {
	const result = await product.getById(req.params.id)
	return res.json(result)
})

routerProducts.post('/', uploadImage().single('image'), async (req, res, next) => {
	const file = req.file
	if (!file) return next(res.render('products-error', { error: 'please upload file' }))
	result = await product.save(req)
	if (!result.data) return res.render('products-error', { error: result.error })
	return res.render('products-create')
})

routerProducts.put('/:id', uploadImage().single('image'), async (req, res, next) => {
	const file = req.file
	if (!file) {
		return next(res.json(response('400', '', 'error in create product...', 'please upload file')))
	}
	const result = await product.updateById(req)
	return res.json(result)
})

routerProducts.delete('/:id', async (req, res) => {
	const result = await product.deleteById(req.params.id)
	return res.json(result)
})

module.exports = routerProducts
