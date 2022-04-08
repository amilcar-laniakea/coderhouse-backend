/** @format */
const express = require('express')

const { Products } = require('../class/products')
const { uploadImage } = require('../functions/uploadImage')
const { response } = require('../functions/response')
const { authorizeGlobalAccess, authorizeUserAdmin } = require('../functions/auth')
const { validateProductCreate } = require('../functions/validateProductCreate')
const { validateProductModify } = require('../functions/validateProductModify')

const routerProducts = express.Router()
const product = new Products('products.txt')

routerProducts.use(authorizeGlobalAccess)

routerProducts.get('/:id?', async (req, res) => {
	const id = req.params.id
	let result
	if (id) result = await product.getById(req.params.id)
	else result = await product.getAll()
	return res.json(result)
})

routerProducts.post('/', authorizeUserAdmin, validateProductCreate, (req, res) => {
	result = product.save(req.product)
	return res.json(result)
})

routerProducts.put('/:id', authorizeUserAdmin, validateProductModify, async (req, res) => {
	const result = await product.updateById(req)
	return res.json(result)
})

routerProducts.delete('/:id', authorizeUserAdmin, async (req, res) => {
	const result = await product.deleteById(req.params.id)
	return res.json(result)
})

module.exports = routerProducts
