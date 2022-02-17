/** @format */

class User {
	constructor(name, lastName, books, pets) {
		this.name = name
		this.lastName = lastName
		this.books = books
		this.pets = pets
	}

	getFullName = () => console.log(`Bienvenido: ${this.name} ${this.lastName}`)
	addPet = (name) => this.pets.push(name)
	countPets = () => this.pets.length
	addBook = (name, title) => this.books.push({ name: name, title: title })
	getBookInfo = (data) => {
		let requestItems = []
		this.books.forEach((e) => {
			requestItems.push(e[data])
		})
		return requestItems
	}
}

const user = new User('amilcar', 'barahona', [], [])

user.getFullName()
user.addPet('Cow')
user.addPet('Cat')
user.addBook('Lewis Hamilton', 'La Masacre Inminente')
user.addBook('Nikita Crushed', 'El Olvido')
const petsQuantity = user.countPets()
const booksAutors = user.getBookInfo('name')
const booksTitles = user.getBookInfo('title')

console.log('mascotas del usuario...', user.pets)
console.log(`cantidad de mascotas... ${petsQuantity}`)
console.log('libros del usuario...', user.books)
console.log(`autores de libros... ${booksAutors}`)
console.log(`titulos de libros... ${booksTitles}`)
