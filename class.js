/** @format */

var fs = require('fs')

class Container {
	constructor(nameFile) {
		this.nameFile = nameFile
	}

	save(item) {
		try {
			const fileRead = fs.readFileSync(`./${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			item = { ...item, id: request[request.length - 1].id + 1 }
			request.push(item)
			console.log('elemento agregado...', item)
			return fs.writeFileSync(`./${this.nameFile}`, JSON.stringify(request))
		} catch (error) {
			const array = []
			item = { ...item, id: 1 }
			array.push(item)
			console.log('archivo creado exitosamente con la data:', item)
			return fs.writeFileSync(`./${this.nameFile}`, JSON.stringify(array))
		}
	}

	getById(item) {
		try {
			item = parseInt(item)
			const fileRead = fs.readFileSync(`./${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			const index = request.findIndex((search) => {
				return search.id === item
			})
			if (index != -1) {
				const result = request[index]
				console.log(`elemento encontrado...`, result)
				return result
			} else {
				console.log(`elemento con id ${item} no se encuentra`)
				return null
			}
		} catch (error) {
			console.log('archivo no existe...', error)
		}
	}

	getAll() {
		try {
			const fileRead = fs.readFileSync(`./${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			console.log('elementos presentes en el archivo...', JSON.parse(fileRead))
			return request
		} catch (error) {
			console.log('el archivo no existe o no existen datos en el archivo...', error)
			return null
		}
	}

	deleteById(item) {
		try {
			item = parseInt(item)
			let arrayRequest = fs.readFileSync(`./${this.nameFile}`, 'utf8')
			arrayRequest = JSON.parse(arrayRequest)
			const index = arrayRequest.findIndex((search) => {
				return search.id === item
			})
			if (index != -1) {
				arrayRequest.splice(index, 1)
				let newArray = [...arrayRequest]
				console.log(`el elemento con el id ${item} fue borrado...`)
				return fs.writeFileSync(`./${this.nameFile}`, JSON.stringify(newArray))
			} else {
				console.log(`el elemento con el id ${item} no fue encontrado...`)
				return null
			}
		} catch (error) {
			console.log('el archivo no existe...')
			return error
		}
	}

	deleteAll() {
		try {
			console.log('elmentos del archivos borrados con exito...')
			const request = fs.writeFileSync(`./${this.nameFile}`, '')
			return request
		} catch (error) {
			console.log(error)
			return null
		}
	}
}

//const container = new Container(`products.txt`)

//container.save({ title: 'Martillo', image: 'https://dummyimage.com/600x400/000/fff' })
//container.getById(2)
//container.getAll()
//container.deleteById(3)
//container.deleteAll()

module.exports = { Container }
