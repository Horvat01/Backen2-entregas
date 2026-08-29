# Plataforma de Eventos e Inscripciones

## Nombre Alumno

**Mathias Horvat**

## Nombre del proyecto

**Plataforma de Eventos e Inscripciones**

## Temática elegida

El proyecto consiste en una API backend para una **Plataforma de Eventos e Inscripciones**.

La plataforma permite gestionar eventos y usuarios, así como administrar las inscripciones de los participantes a los diferentes eventos disponibles.

El sistema permite:

* Crear y consultar eventos.

* Obtener información específica de un evento.

* Gestionar usuarios.

* Gestionar las inscripciones de los usuarios a los eventos.

* Almacenar la información utilizando MongoDB.

## Tecnologías

* **Node.js** — Entorno de ejecución.

* **Express.js** — Framework para la creación de la API REST.

* **MongoDB** — Base de datos.

* **Mongoose** — ODM para trabajar con MongoDB.

* **JavaScript** — Lenguaje principal.

* **dotenv** — Manejo de variables de entorno.

* **Git / GitHub** — Control de versiones.

* **Postman** — Herramienta utilizada para probar los endpoints de la API.

## Instalación

Clonar el repositorio:

```bash

git clone https://github.com/Horvat01/Backen2-entregas.git

```

Ingresar a la carpeta del proyecto:

```bash

cd Backen2-entregas

```

Instalar las dependencias:

```bash

npm install

```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`.

El archivo `.env.example` incluido en el repositorio contiene las variables necesarias para configurar el proyecto sin exponer información sensible.

Ejemplo:

```env

PORT=3000

MONGO_URI=mongodb://localhost:27017/95270

NODE_ENV=development

```

Las variables permiten configurar el puerto del servidor, la conexión con MongoDB y el entorno de ejecución.

El archivo `.env` no debe subirse al repositorio. Debe estar incluido en `.gitignore`.

El archivo `.env.example` sí debe estar incluido en el repositorio, ya que funciona como referencia para configurar las variables de entorno necesarias.

## Cómo ejecutar

Para iniciar el servidor en modo desarrollo:

```bash

npm run dev

```

El servidor quedará disponible en:

```text

http://localhost:3000

```

Para iniciar el servidor en modo normal:

```bash

npm start

```

## Estructura de carpetas

```text

node-backend2/

│

├── src/

│ │

│ ├── config/

│ │ ├── database.js

│ │ └── env.js

│ │

│ ├── controllers/

│ │ └── event.controllers.js

│ │

│ ├── middlewares/

│ │ └── .gitkeep

│ │

│ ├── models/

│ │ ├── event.model.js

│ │ └── user.model.js

│ │

│ ├── routes/

│ │ ├── event.routes.js

│ │ └── user.routes.js

│ │

│ ├── utils/

│ │ └── .gitkeep

│ │

│ ├── app.js

│ └── server.js

│

├── .env

├── .env.example

├── .gitignore

├── eventos.postman_collection.json

├── package.json

├── package-lock.json

└── README.md

```

### Descripción de las carpetas

* **`config/`**: contiene la configuración de la aplicación, incluyendo la conexión a MongoDB y las variables de entorno.

* **`controllers/`**: contiene la lógica encargada de procesar las solicitudes y generar las respuestas.

* **`middlewares/`**: espacio destinado a middlewares personalizados para validaciones, autenticación, manejo de errores, etc.

* **`models/`**: contiene los modelos de Mongoose que representan las entidades almacenadas en MongoDB.

* **`routes/`**: define las rutas y endpoints disponibles de la API.

* **`utils/`**: contiene funciones y utilidades reutilizables.

* **`app.js`**: configura Express, los middlewares y las rutas principales.

* **`server.js`**: inicia el servidor y establece la conexión con la base de datos.

* **`.env`**: contiene las variables de entorno utilizadas localmente y no debe subirse al repositorio.

* **`.env.example`**: muestra las variables necesarias para configurar el proyecto sin exponer información sensible.

* **`eventos.postman_collection.json`**: colección de Postman para probar los endpoints de la API.