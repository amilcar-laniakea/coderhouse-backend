/** @format */

const { Container } = require('./class')

//instanciado el objeto  que incluye sus metodos en el archivo class llamado COntainer

const request = new Container('products.txt')

//los atributos siguientes son los parametros que requieren las funciones

//el array primario que recibe el archivo al ser creado en la funcion createFile(), es opcional
const array = [
	{
		title: 'Procesador',
		price: 145.5,
		image: 'https://i.dell.com/sites/csimages/Learn_Imagery/all/processor-badge-pentium100x100.jpg',
		id: 1,
	},
	{
		title: 'Memoria',
		price: 99.99,
		image: 'https://productostic.com/wp-content/uploads/2021/12/KVR26S19D816-44-510x510.jpg',
		id: 2,
	},
	{
		title: 'Grafica',
		price: 530.12,
		image: 'https://images.evga.com/products/gallery/png/11G-P4-6796-RX_MD_1.png',
		id: 3,
	},
]

//object es el que se inyecta al array existente
const object = {
	title: 'Disco duro',
	price: 65.5,
	image: 'https://m.media-amazon.com/images/I/91Fg8e28i9L._AC_SX355_.jpg',
}

//parametro que espedifica el id a buscar en la funcion checkObjectID()
const objectRequestID = 4

//parametro que espedifica el id a eliminar en la funcion deleteObjectID()
const objectDeleteID = 2

//parametro que espedifica si el archivo va a ser sobreescrito(borrado) en el ultimo then del ciclo de las funciones
const arrayDeleteRequest = false

//llamado de metodos del archivo class:

request
	.createFile(array)
	.then(async () => {
		await request.checkObject().then(async (response) => {
			if (response) {
				const arrayProducts = JSON.parse(response)
				const asignedObject = { ...object, id: arrayProducts.length + 1 }
				arrayProducts.push(asignedObject)
				await request.saveObject(arrayProducts, asignedObject.id)
			} else {
				let arrayProducts = []
				const asignedObject = { ...object, id: 1 }
				arrayProducts.push(asignedObject)
				await request.saveObject(arrayProducts, asignedObject.id)
			}
		})
	})
	.then(async () => {
		await request.checkObjectID(objectRequestID).then(async (response) => {
			if (response) console.log('el objeto encontrado es...', response)
			else console.log('no se encontraron coincidencias...')
		})
	})
	.then(async () => {
		await request.getAll().then(async (response) => {
			if (response) console.log('los resultados son...', response)
			else console.log('no se encontraron resultados...')
		})
	})
	.then(async () => {
		await request.deleteObjectID(objectDeleteID).then(async (response) => {
			if (response) {
				console.log(
					'el objeto con el id ha sido borrado exitosamente...',
					response.deleteObject
				)
				console.log('nuevo array generado...', response.newArray)
			} else console.log('no hay elemento para borrar...')
		})
	})
	.then(async () => {
		await request.deleteAll(arrayDeleteRequest).then(async (response) => {
			if (response) {
				console.log('el contenido del archivo ha sido borrado con exito...')
			}
		})
	})
	.catch((error) => {
		console.log('e...', error)
	})
