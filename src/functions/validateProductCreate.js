/** @format */
const formidable = require('formidable')
var fs = require('fs')

const path = require('path')
const { response } = require('./response')
const { Product } = require('../class/product')

const validateProductCreate = (req, res, next) => {
	let imagePath
	const requiredFields = ['name', 'description', 'price', 'code', 'stock']
	const options = {
		uploadDir: path.join(__dirname, '..', 'uploads'),
		keepExtensions: true,
		maxFieldsSize: 5 * 1024 * 1024,
		multiples: false,
		filename: function (name, ext, part, form) {
			return name + '-' + Date.now() + ext
		},
	}

	let form = new formidable.IncomingForm(options)

	form.on('fileBegin', (name, file) => {
		imagePath = file.filepath
	})

	form.on('field', (name, value) => {
		if (requiredFields.indexOf(name) > -1 && !value) {
			form._error('Required field is empty!')
			return
		}
	})

	form.parse(req, (err, fields, files) => {
		if (Object.keys(files).length === 0) return res.json(response('400', '', 'error in field form', 'error in form'))
		if (err) return res.json(response('400', '', 'error in form fields...', err))
		let product = new Product(fields.name, fields.description, parseFloat(fields.price), fields.code, parseInt(fields.stock), Date.now(), imagePath)
		const validateObject = !Object.values(product).some((item) => item === undefined || item === null || item === '')
		if (validateObject) {
			req.product = product
			next()
		} else {
			fs.unlinkSync(imagePath)
			return res.json(response('400', '', 'error in create product...', 'please verify what all fields are filled and correctly typed...'))
		}
	})

	form.on('error', (message) => {
		if (imagePath) fs.unlinkSync(imagePath)
		return res.json(response('400', '', 'please verify what all fields are filled and correctly typed...', message))
	})
}

module.exports = { validateProductCreate }
