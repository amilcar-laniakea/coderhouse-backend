/** @format */
const express = require('express')
const routerProducts = express.Router()

const { Products } = require('../class/product')

const product = new Products([])

routerProducts.get('/', async (req, res) => {
	const result = await product.getAll()
	return res.json(result)
})

routerProducts.get('/:id', async (req, res) => {
	const result = await product.getById(req.params.id)
	return res.json(result)
})

routerProducts.post('/', async (req, res) => {
	const result = await product.save(req.body)
	return res.json(result)
})

routerProducts.put('/:id', async (req, res) => {
	const result = await product.updateById(req.params.id, req.body)
	return res.json(result)
})

routerProducts.delete('/:id', async (req, res) => {
	const result = await product.deleteById(req.params.id)
	return res.json(result)
})

module.exports = routerProducts
