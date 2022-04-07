/** @format */

const response = (code, data, messaje, error) => {
	return {
		statusCode: code,
		data: data,
		messaje: messaje,
		error: error,
	}
}

module.exports = { response }
