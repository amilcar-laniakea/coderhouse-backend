/** @format */
var fs = require('fs')

const { response } = require('../functions/response')

class Chat {
	constructor(nameFile) {
		this.nameFile = nameFile
	}

	save(item) {
		try {
			const fileRead = fs.readFileSync(`./${this.nameFile}`, 'utf8')
			const requestFile = JSON.parse(fileRead)
			requestFile.push(item)
			fs.writeFileSync(`./${this.nameFile}`, JSON.stringify(requestFile))
			return requestFile
		} catch (error) {
			return response('400', '', 'error in create product...', 'error in function save()...')
		}
	}

	getAll() {
		try {
			const fileRead = fs.readFileSync(`./${this.nameFile}`, 'utf8')
			const request = JSON.parse(fileRead)
			return request
		} catch (error) {
			const array = []
			fs.writeFileSync(`./${this.nameFile}`, JSON.stringify(array))
			return array
		}
	}
}

module.exports = { Chat }
