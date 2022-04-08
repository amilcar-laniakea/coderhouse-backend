/** @format */
const formidable = require('formidable')
const path = require('path')
const { Product } = require('../class/product')

const validateProductModify = (req, res, next) => {
	let imagePath
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

	form.parse(req, (err, fields, files) => {
		let product = new Product(fields.name, fields.description, parseFloat(fields.price), fields.code, parseInt(fields.stock), Date.now(), imagePath)
		Object.keys(product).forEach((key) => {
			if (product[key] === null || product[key] === undefined) {
				delete product[key]
			}
		})
		req.product = product
		next()
	})
}

module.exports = { validateProductModify }
