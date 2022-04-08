/** @format */

const { response } = require('./response')

const authorizeGlobalAccess = (req, res, next) => {
	let auth = req.headers.authorization ? req.headers.authorization.split(' ') : undefined
	auth = auth && auth.length > 0 ? auth[1] : undefined
	if (process.env.BEARER_TOKEN === auth) {
		next()
	} else {
		res.json(response('400', '', 'request is not allowed...', 'access denied...'))
	}
}

const authorizeUserAdmin = (req, res, next) => {
	let auth = req.headers.administrator

	if (typeof auth != 'boolean') {
		if (auth === 'true') auth = true
		else if (auth === 'false') auth = false
		else res.json(response('400', '', 'invalid administrator value...', 'access denied...'))
	}

	if (auth) {
		next()
	} else {
		res.json(response('400', '', 'need administrator permissions to handle this request...', 'access denied...'))
	}
}

module.exports = { authorizeGlobalAccess, authorizeUserAdmin }
