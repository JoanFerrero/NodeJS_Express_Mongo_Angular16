# NodeJS_Express_Mongo_Angular16

Por [`Joan Ferrero Montiel`](https://github.com/JoanFerrero)  

## Tabla de Contenidos

1. Walapop_Joan
2. Instalar
3. Tecnologias


# Walapop_Joan! 
_Proyecto con referencia a la aplicacion - Web Walapop_

1. **Home:**
   Carousel e infiniteScroll de las categorias más populares

2. **Shop:**
   Listados de productos, filtros, paginación, añadir a favorito, propetario de cada producto con redireccion a su perfil.

3. **Details:**
   Ver detalles junto a un Carousel del propio producto, añadir a favoritos y comentar el producto.
   Además permite visitar el perfil del propietario de producto.

4. **Profile:**
   Ver el perfil de cualquier usuario, seguirlo, ver sus productos y seguidores - seguidos. 
   Si eres ese usuario podras crear productos nuevos desde el perfil y editar los datos de usuario.
   

5. **Login:**
   Register y Login de usuario.

## Instalar 💿

---

### `Requisitos`
Es necesario crear el fichero .env en la carpeta backend. El contenido puede ser el mismo que el de env_example.txt

Tener instalado las siguientes herramientas:

- [NodeJS](https://nodejs.org/en/download/) v18.18.0
- [Angular](https://angular.io/) v16
- [MongoDB](https://www.mongodb.com/try/download/community)

### `Puesta en marcha`

#### Backend
  ```
  cd backend
  npm install
  npm run dev
  ```

  #### Frontend
  ```
  cd frontend
  npm install
  npm run start
  ```

## Tecnologías 👨‍💻

---

Lista de tecnologías utilizadas en este proyecto:

`Backend` 🏗️

- [ExpressJs](https://expressjs.com/): V4.18.2
  - NodeJS
  - Javascript
  - Routes
  - Models
  - Controllers
  - DB validation
  - Mongoose
    - Relationships
    - Schema
  - Middleware_auth
    - Token JWT


`Frontend` 🏛️

- [Angular](https://angular.io/): V16
  - TypeScript
  - Estructurado en Modules, Shared y Core
  - Routes
  - Models
  - Components
  - Reactive Forms
    - Validation
  - Lazy load
  - Angular Authentication
    - Guards
    - Interceptor
    - Services
    - Authentication JWT enviado por Headers
  - Sucriptions y Observables
  - RxJS Subjects
  - Toastr
  

`BBDD`💾

- [MongoDB](https://www.mongodb.com/)
