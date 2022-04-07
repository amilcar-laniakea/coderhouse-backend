/** @format */

class Product {
	constructor(title, price, category, id, image) {
		this.title = title.toString()
		this.price = isNaN(price) ? undefined : price
		this.category = category.toString()
		this.id = isNaN(id) ? undefined : id
		this.image = image.toString()
	}
}
module.exports = { Product }
