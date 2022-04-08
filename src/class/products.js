/** @format */
const fs = require('fs')

const { Product } = require('./product')
const { response } = require('../functions/response')

class Products {
	constructor(namefile) {
		this.nameFile = namefile
	}

	save(item) {
		try {
			const fileRead = fs.readFileSync(`./src/${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			item = { ...item, id: request.length === 0 ? 1 : request[request.length - 1].id + 1 }
			request.push(item)
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(request))
			return response('200', item, 'success...', 'product has sucessfull added...')
		} catch (error) {
			item = { ...item, id: 1 }
			const array = [item]
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(array))
			return response('200', item, 'success...', 'file has sucessfull saved and product added...')
		}
	}

	getAll() {
		try {
			const fileRead = fs.readFileSync(`./src/${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			return response('200', request, request?.length > 0 ? 'success...' : 'The list is empty...')
		} catch (error) {
			const array = []
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(array))
			return response('200', '', 'succes create file with empty products...', 'success...')
		}
	}

	getById(item) {
		try {
			if (isNaN(item)) return response('400', '', 'only numbers are allowed...')
			item = parseInt(item)
			const fileRead = fs.readFileSync(`./src/${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			const index = request.findIndex((search) => {
				return search.id === item
			})
			if (index != -1) {
				const result = request[index]
				return response('200', result, 'success...')
			} else {
				return response('200', '', `product requested id not found: ${item}`)
			}
		} catch (error) {
			const array = []
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(array))
			return response('400', error, 'file products.txt does ot exits...', 'successfull create an empty file...')
		}
	}

	updateById(item) {
		try {
			if (isNaN(item.params.id)) return response('200', '', 'only numbers are allowed...')
			const id = parseInt(item.params.id)
			const fileRead = fs.readFileSync(`./src/${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			const index = request.findIndex((search) => {
				return search.id === id
			})
			if (index != -1) {
				fs.unlinkSync(request[index].image)
				request[index] = {
					...request[index],
					...item.product,
				}
				fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(request))
				return response('200', `id ${id}`, 'success update product...')
			} else {
				fs.unlinkSync(item.product.image)
				return response('200', '', `product requested id not found: ${id}`)
			}
		} catch (error) {
			fs.unlinkSync(item.product.image)
			const array = []
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(array))
			return response('400', error, 'file products.txt does ot exits...', 'successfull create an empty file...')
		}
	}

	deleteById(id) {
		try {
			id = parseInt(id)
			if (isNaN(id)) return response('400', '', 'only numbers are allowed...')
			const fileRead = fs.readFileSync(`./src/${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			const index = request.findIndex((search) => {
				return search.id === id
			})
			if (index != -1) {
				fs.unlinkSync(request[index].image)
				request.splice(index, 1)
				fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(request))
				return response('200', `id: ${id}`, 'requested deleted product has successfull...')
			} else {
				return response('200', '', `product requested id not found: ${id}`)
			}
		} catch (error) {
			const array = []
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(array))
			return response('400', error, 'file products.txt not found...', 'file successfully created...')
		}
	}
}

module.exports = { Products }
