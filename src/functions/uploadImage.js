/** @format */

const multer = require('multer')

const uploadImage = () => {
	let storage = multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, './src/uploads')
		},
		filename: (req, file, callback) => {
			callback(
				null,
				file.fieldname.trim().replace(/\s/g, '_').replace(/\\/g, '') + '-' + file.originalname.trim().replace(/\s/g, '_').replace(/\\/g, '') + '-' + Date.now() + '.png'
			)
		},
	})
	const upload = multer({ storage: storage })
	return upload
}

module.exports = { uploadImage }
