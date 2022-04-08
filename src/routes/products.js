/** @format */
const express = require('express')

const { Products } = require('../class/products')
const { uploadImage } = require('../functions/uploadImage')
const { response } = require('../functions/response')
const { authorizeGlobalAccess, authorizeUserAdmin } = require('../functions/auth')
const { validateProductObject } = require('../functions/validateProductObject')

const routerProducts = express.Router()
const product = new Products([])

routerProducts.use(authorizeGlobalAccess)

routerProducts.get('/:id?', async (req, res) => {
	const id = req.params.id
	let result
	if (id) result = await product.getById(req.params.id)
	else result = await product.getAll()
	return res.json(result)
})

routerProducts.post('/', authorizeUserAdmin, validateProductObject, (req, res) => {
	result = product.save(req.product)
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
