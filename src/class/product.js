/** @format */

class Product {
	constructor(name, description, price, code, stock, date, image) {
		this.name = name ? name.toString() : null
		this.description = description ? description.toString() : null
		this.price = isNaN(price) ? undefined : price
		this.code = code ? code.toString() : null
		this.stock = isNaN(stock) ? undefined : stock
		this.date = date ? date : null
		this.image = image ? image : null
	}
}
module.exports = { Product }
