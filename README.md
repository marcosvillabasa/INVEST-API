# INVEST-API
REST API que entrega información precisa sobre valores de acciones para ciertas empresas en la bolsa de valores de Estados Unidos.

## Usuarios
Creado el modelo de usuario en Mongo con sus correspondientes metodos de crear, obtener usuarios y login generando un JWT. El metodo crear usuario esta protegido con un token que sirve para saber que usuario lo creo.

## Reporte
En la ruta Reporte esta el metodo principal donde obtiene los datos de la Api, los procesa y devuelve mediante consola un objeto con los datos solicitados.
En esta ruta pasamos por parametro la accion y el token para ver que usuario hace la peticion.
Tambien se crea un log donde se almacena cada peticion.

Todas las rutas las verifique con Postman.
