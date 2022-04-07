/** @format */

const { response } = require('./response')

const handleAccess = (req, res, next) => {
	let auth = req.headers.authorization ? req.headers.authorization.split(' ') : undefined
	auth = auth && auth.length > 0 ? auth[1] : undefined
	if (process.env.BEARER_TOKEN === auth) {
		next()
	} else {
		res.json(response('400', '', 'request is not allowed...', 'access denied...'))
	}
}

module.exports = { handleAccess }
