# SO1_P1_201901849

## Fernando Mauricio Gómez Santos
## 201901849

Primera práctica del curso de Sistemas Operativos 1. El sistema consiste en una aplicación que realiza operaciones CRUD acerca de los automóviles que se encuentren registrados.

## Antes de iniciar

Se recomienda que el repositorio sea usado únicamente para estudiar el código que compone cada parte del sistema. Si el lector desea desplegar la aplicación, entonces Docker es una mejor opción. En __Docker__ se ampliará la información.

## Tecnologías usadas

* React
* JS
* Node 16
* Go 1.19
* MongoDB

## Frontend
El frontend fue desarrollado usando JS y React. Para los estilos se utilizó el framework Bootstrap. Los componentes del frontend son:

  * __Navbar:__ Contiene un logo y cuatro links que redirigen la vista hacia el componente al que están unidos.
  * __CarFilter:__ Consiste en un grupo de botones que cambia el filtro de la búsqueda, es decir, según el botón que se presione entonces el filtro funcionará por modelo, marca o color.
  * __CarList:__ Despliega una tabla que contiene a todos los autos registrados en la base de datos. Cada columna contiene un dato sobre el auto, además existen otras dos columnas que en las cuales se encuentra un botón para seleccionar el auto para actualizar sus datos y otro que lo elimina de la base de datos.
  * __CarInsert:__ Consta de un formulario para ingresar cada uno de los campos para registrar un auto nuevo.
  * __CarUpdate:__ Consta de un formulario para ingresar cada uno de los campos para registrar un auto nuevo.

## Backend
Para el backend se utiliza un servidor creado con Go el cual se encuentra conectado a la base de datos de MongoDB. Los principales paquetes a utilizar son "gorilla" y los drivers de mongo.

## Base de Datos
MongoDB es empleado como base de datos local y en ella se guardan las operaciones realizadas en el frontend y los autos registrados cuyas propiedades son:

  * Placa
  * Marca
  * Modelo
  * Serie
  * Color
  
## Docker
Para un despliegue rápido y eficiente se han subido imágenes a DockerHub tanto del frontend como del backend. En la carpeta principal del repositorio se encuentra un ejemplo de como crear el archivo docker-compose para ejecutar las aplicaciones. Los únicos elementos del docker-compose que deben ser editados son los "build" del servicio backend y de frontend, los cuales deben ser eliminados.
