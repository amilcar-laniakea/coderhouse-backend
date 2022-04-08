/** @format */

const { Product } = require('./product')
const { response } = require('../functions/response')

class Products {
	constructor(products) {
		this.products = products
	}

	save(item) {
		try {
			this.products.push(item)
			return response('200', this.products, 'success...', 'product has sucessfull added...')
		} catch (error) {
			return response('400', '', 'error in create product...', 'error in function save()...')
		}
	}

	getAll() {
		try {
			return response('200', this.products, this.products?.length > 0 ? 'success...' : 'The list is empty...')
		} catch (error) {
			return response('400', '', 'error in get products...', 'error in function getAll()...')
		}
	}

	getById(item) {
		try {
			if (isNaN(item)) return response('400', '', 'only numbers are allowed...')
			item = parseInt(item)
			const index = this.products.findIndex((search) => {
				return search.id === item
			})
			if (index != -1) {
				const request = this.products[index]
				return response('200', request, 'success...')
			} else {
				return response('200', '', `product requested id not found: ${item}`)
			}
		} catch (error) {
			console.log('error...', error)
			return response('400', error, 'an error has ocurred...', 'error in function getById()...')
		}
	}

	updateById(item) {
		try {
			if (isNaN(item.params.id)) return response('200', '', 'only numbers are allowed...')
			const id = parseInt(item.params.id)
			const index = this.products.findIndex((search) => {
				return search.id === id
			})
			if (index != -1) {
				let product = new Product(item.body.title, parseFloat(item.body.price), item.body.category, 0, item.file.path.replace(/\\/g, '/'))
				const validateObject = !Object.values(product).some((item) => item === undefined || item === null || item === '')
				if (validateObject) {
					this.products[index] = {
						...product,
						id: id,
					}
					return response('200', this.products, 'success...')
				} else {
					return response('200', '', 'error in create product...', 'please verify what all fields are filled and correctly typed...')
				}
			} else {
				return response('200', '', `product requested id not found: ${id}`)
			}
		} catch (error) {
			console.log('error...', error)
			return response('400', error, 'ha ocurrido un error...', 'error in function updateById()...')
		}
	}

	deleteById(id) {
		try {
			id = parseInt(id)
			if (isNaN(id)) return response('200', '', 'solo se aceptan numeros...')
			const index = this.products.findIndex((search) => {
				return search.id === id
			})
			if (index != -1) {
				this.products.splice(index, 1)
				return response('200', this.products, `requested deleted product was deleted: ${id}`)
			} else {
				return response('200', '', `product requested id not found: ${id}`)
			}
		} catch (error) {
			console.log('error...', error)
			return response('400', error, 'ha ocurrido un error...', 'error in function deleteById()...')
		}
	}
}

module.exports = { Products }
