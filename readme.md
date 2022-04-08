
Primera entrega del proyecto final del curso de backend node.js

requisitos para iniciar y testear el proyecto:
 1.- archivo .env con los valores:
  NODE_ENV=develop
  PORT=8080
  BEARER_TOKEN=Nankurunaisa$/*-

  el NODE+ENV es para verificar el ambiente si es produccion o no
  el BEARER_TOKEN es la autorizacion global para poder acceder a todos los metodos en las rutas de productos

  2.- requisito para pruebas: POSTMAN
    en autorization usar "bearer token" : Nankurunaisa$/*- para acceder a las rutas de productos
    -rutas disponibles:
      tipo GET: /api/products/id? para acceder a todos los productos (parametro opcional para acceder a un producto especifico)

    las demas rutas necesitan en el header el atributo: administrator = true, para acceder a los metodos

      tipo POST: /api/products body con forma form-data y los siguientes atributos
        name => tipo texto
        description => tipo texto
        price => tipo textto
        code => tipo texto
        stock => tipo texto
        image => tipo archivo
      
      tipo PUT:  /api/products/:id, con forma form-data con los siguientes atributos opcionales aleaorios:
        name => tipo texto
        description => tipo texto
        price => tipo textto
        code => tipo texto
        stock => tipo texto
        image => tipo archivo

      tipo DELETE: /api/products/:id para borrar el producto con el id deseado.


