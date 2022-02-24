/** @format */

var fs = require('fs')

class Container {
	constructor(nameFile) {
		this.nameFile = nameFile
	}

	createFile = async (item) => {
		try {
			console.log('archivo creado de forma exitosa...')
			if (item) {
				const data = JSON.stringify(item)
				return await fs.promises.writeFile(`./${this.nameFile}`, data)
			} else return await fs.promises.open(`./${this.nameFile}`, 'w')
		} catch (error) {
			console.error(error)
		}
	}

	checkObject = async () => {
		return await fs.promises.readFile(`./${this.nameFile}`, 'utf8')
	}

	saveObject = async (item, id) => {
		const data = JSON.stringify(item)
		try {
			console.log(`objeto asignado al archivo con el id: ${id}`)
			await fs.promises.writeFile(`./${this.nameFile}`, data)
		} catch (err) {
			console.error(err)
		}
	}

	checkObjectID = async (item) => {
		let arrayRequest = await fs.promises.readFile(`./${this.nameFile}`, 'utf8')
		arrayRequest = JSON.parse(arrayRequest)
		const index = arrayRequest.findIndex((search) => {
			return search.id === item
		})
		if (index != -1) return arrayRequest[index]
		else return null
	}

	getAll = async () => {
		let arrayRequest = await fs.promises.readFile(`./${this.nameFile}`, 'utf8')
		return JSON.parse(arrayRequest)
	}

	deleteObjectID = async (item) => {
		if (item) {
			let arrayRequest = await fs.promises.readFile(`./${this.nameFile}`, 'utf8')
			arrayRequest = JSON.parse(arrayRequest)
			const index = arrayRequest.findIndex((search) => {
				return search.id === item
			})

			if (index != -1) {
				let deleteObject = arrayRequest.splice(index, 1)
				let newArray = [...arrayRequest]
				const info = {
					deleteObject: deleteObject,
					newArray: newArray,
				}
				await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(newArray))
				return info
			} else return null
		} else return null
	}

	deleteAll = async (item) => {
		if (item) return await fs.promises.open(`./${this.nameFile}`, 'w')
	}
}

module.exports = { Container }
