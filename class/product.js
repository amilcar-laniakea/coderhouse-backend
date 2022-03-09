/** @format */

var fs = require('fs')

result = (code, data, messaje) => {
	return {
		statusCode: code,
		data: data,
		messaje: messaje,
	}
}

class Products {
	constructor(products) {
		this.products = products
	}

	save(item) {
		try {
			if (this.products.length === 0) item = { ...item, id: 1 }
			else item = { ...item, id: this.products[this.products.length - 1].id + 1 }
			this.products.push(item)
			return result('200', this.products, 'success...')
		} catch (error) {
			return result('400', '', 'error en agregar un archivo...')
		}
	}

	getAll() {
		try {
			return result('200', this.products, 'success...')
		} catch (error) {
			console.log('error...', error)
			return result('400', '', 'error en lectura de archivo o no se encuentra...')
		}
	}

	getById(item) {
		try {
			if (isNaN(item)) return result('400', '', 'solo se aceptan numeros...')
			item = parseInt(item)
			const index = this.products.findIndex((search) => {
				return search.id === item
			})
			if (index != -1) {
				const request = this.products[index]
				return result('200', request, 'success...')
			} else {
				console.log(`elemento con id ${item} no se encuentra`)
				return result('200', '', 'producto no encontrado...')
			}
		} catch (error) {
			console.log('error...', error)
			return result('400', error, 'ha ocurrido un error...')
		}
	}

	updateById(id, item) {
		try {
			if (isNaN(id)) return result('400', '', 'solo se aceptan numeros...')
			id = parseInt(id)
			const index = this.products.findIndex((search) => {
				return search.id === id
			})
			if (index != -1) {
				this.products[index] = {
					...item,
					id: id,
				}
				return result('200', this.products, 'success...')
			} else {
				console.log(`elemento con id ${id} no se encuentra`)
				return result('200', '', 'producto no encontrado...')
			}
		} catch (error) {
			console.log('error...', error)
			return result('400', error, 'ha ocurrido un error...')
		}
	}

	deleteById(id) {
		try {
			id = parseInt(id)
			if (isNaN(id)) return result('400', '', 'solo se aceptan numeros...')
			const index = this.products.findIndex((search) => {
				return search.id === id
			})
			if (index != -1) {
				this.products.splice(index, 1)
				console.log(`el elemento con el id ${id} fue borrado...`)
				return result('200', this.products, 'success...')
			} else {
				console.log(`el elemento con el id ${id} no fue encontrado...`)
				return result('400', '', 'id no encontrado...')
			}
		} catch (error) {
			console.log('error...', error)
			return result('400', error, 'ha ocurrido un error...')
		}
	}
}

module.exports = { Products }
