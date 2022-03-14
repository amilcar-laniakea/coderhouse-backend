/** @format */
const express = require('express')
const routerProducts = express.Router()

const { Products } = require('../class/products')
const { uploadImage } = require('../functions/uploadImage')
const { response } = require('../functions/response')

const product = new Products([])

routerProducts.get('/', async (req, res) => {
	const result = await product.getAll()
	return res.json(result)
})

routerProducts.get('/:id', async (req, res) => {
	const result = await product.getById(req.params.id)
	return res.json(result)
})

routerProducts.post('/', uploadImage().single('image'), async (req, res, next) => {
	const file = req.file
	if (!file) {
		return next(res.json(response('400', '', 'error in create product...', 'please upload file')))
	}
	const result = await product.save(req)
	return res.json(result)
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
