/** @format */

class User {
	constructor(name, lastName, books, pets) {
		this.name = name
		this.lastName = lastName
		this.books = books
		this.pets = pets
	}
}

const getFullName = (name, lastName) => console.log(`Bienvenido: ${name} ${lastName}`)
const addPet = (name) => user.pets.push(name)
const countPets = (item) => item.length
const addBook = (name, title) => user.books.push({ name: name, title: title })
const getBookInfo = (items, data) => {
	let requestItems = []
	items.forEach((element) => {
		requestItems.push(element[data])
	})
	return requestItems
}

const user = new User('amilcar', 'barahona', [], [])

getFullName('Amilcar', 'Barahona')
addPet('cat')
addBook('Lewis Hamilton', 'La Masacre Inminente')
addBook('Nikita Crushed', 'El Olvido')
console.log('Información del usuario...', user)
console.log(`Autores: ${getBookInfo(user.books, 'name')}`)
console.log(`Libros: ${getBookInfo(user.books, 'title')}`)
