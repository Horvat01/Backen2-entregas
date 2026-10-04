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
* Modificar eventos según los permisos del usuario.
* Gestionar usuarios.
* Gestionar las inscripciones de los usuarios a los eventos.
* Implementar autenticación mediante Passport.js y JWT.
* Implementar autorización mediante roles.
* Validar la propiedad de los eventos.
* Aplicar reglas de negocio sobre los eventos.
* Filtrar, ordenar y paginar eventos.
* Almacenar la información utilizando MongoDB.

---

# Tecnologías

* **Node.js** — Entorno de ejecución.
* **Express.js** — Framework para la creación de la API REST.
* **MongoDB** — Base de datos.
* **Mongoose** — ODM para trabajar con MongoDB.
* **JavaScript** — Lenguaje principal.
* **Passport.js** — Sistema de autenticación.
* **Passport-Local** — Estrategia utilizada para registro e inicio de sesión.
* **Passport-JWT** — Estrategia utilizada para validar usuarios autenticados mediante JWT.
* **JSON Web Token (JWT)** — Sistema utilizado para la autenticación.
* **bcrypt** — Hash y validación de contraseñas.
* **dotenv** — Manejo de variables de entorno.
* **cookie-parser** — Manejo de cookies.
* **Git / GitHub** — Control de versiones.
* **Postman** — Herramienta utilizada para probar los endpoints de la API.

---

# Roles y autorización

La plataforma implementa un sistema de autorización basado en tres roles:

* `user`
* `organizer`
* `admin`

Cada usuario tiene un rol determinado y las rutas protegidas verifican los permisos antes de permitir realizar determinadas acciones.

## Roles

### User

Es el rol asignado por defecto a los usuarios registrados.

Puede:

* Iniciar sesión.
* Consultar eventos.
* Consultar información de los eventos publicados.

No puede:

* Crear eventos.
* Modificar eventos.
* Cancelar eventos.
* Acceder a rutas administrativas.

### Organizer

Es el rol destinado a los usuarios encargados de organizar eventos.

Puede:

* Iniciar sesión.
* Consultar eventos.
* Crear eventos.
* Modificar sus propios eventos.
* Cambiar el estado de sus propios eventos.
* Cancelar sus propios eventos.

No puede:

* Modificar eventos pertenecientes a otros organizadores.
* Cancelar eventos pertenecientes a otros organizadores.
* Acceder a rutas administrativas exclusivas del administrador.

### Admin

Es el rol con mayores permisos dentro de la aplicación.

Puede:

* Iniciar sesión.
* Consultar eventos.
* Crear eventos.
* Modificar cualquier evento.
* Cambiar el estado de cualquier evento.
* Cancelar cualquier evento.
* Gestionar usuarios.
* Acceder a rutas administrativas.

---

# Matriz de permisos

| Acción                             | `user` | `organizer` | `admin` |
| :--------------------------------- | :----: | :---------: | :-----: |
| Consultar eventos publicados       |    ✅   |      ✅      |    ✅    |
| Crear eventos                      |    ❌   |      ✅      |    ✅    |
| Modificar/cancelar eventos propios |    ❌   |      ✅      |    ✅    |
| Modificar cualquier evento         |    ❌   |      ❌      |    ✅    |
| Ver todos los usuarios             |    ❌   |      ❌      |    ✅    |
| Acceder a rutas administrativas    |    ❌   |      ❌      |    ✅    |

---

# Registro de usuarios y roles

El modelo `User` contiene un campo `role` con los siguientes valores permitidos:

```text
user
organizer
admin
```

El rol por defecto es:

```text
user
```

El registro público **no permite que el usuario determine libremente su rol mediante el body**.

Aunque se envíe un rol en la solicitud de registro, el flujo de registro controla el valor permitido y evita que un usuario pueda registrarse directamente como `admin` u `organizer`.

Los roles privilegiados deben ser asignados mediante mecanismos administrativos.

---

# Autenticación

La autenticación de la aplicación se implementa utilizando **Passport.js** y **JWT**.

El flujo de autenticación funciona de la siguiente manera:

1. El usuario se registra mediante `/api/sessions/register`.
2. Passport utiliza la estrategia `register`.
3. Los datos del usuario son validados.
4. La contraseña es almacenada utilizando un hash generado con bcrypt.
5. El usuario inicia sesión mediante `/api/sessions/login`.
6. Passport utiliza la estrategia `login`.
7. Se valida el email y la contraseña.
8. Si las credenciales son correctas, se genera un JWT.
9. El JWT se almacena en una cookie `HttpOnly` llamada `currentUser`.
10. Las rutas protegidas validan el JWT mediante la estrategia `current`.
11. Passport recupera la información del usuario autenticado.
12. Los middlewares de autorización verifican el rol y los permisos correspondientes.

---

# Cookies y JWT

El JWT se almacena en una cookie:

```text
currentUser
```

La cookie se configura como `HttpOnly`, evitando que pueda ser accedida directamente desde JavaScript del navegador.

Las rutas protegidas utilizan Passport para validar el token.

Ejemplo:

```js
passport.authenticate("current", { session: false })
```

---

# Estructura del proyecto

La aplicación utiliza una arquitectura separada por responsabilidades:

```text
src/
├── config/
│   ├── database.js
│   ├── env.js
│   └── passport.config.js
│
├── controllers/
│   ├── event.controllers.js
│   ├── session.controller.js
│   └── user.controller.js
│
├── dao/
│   ├── event-detail.dto.js
│   └── user.dto.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── models/
│   ├── event.model.js
│   └── user.model.js
│
├── repositories/
│   ├── event.repository.js
│   └── user.repository.js
│
├── routes/
│   ├── event.routes.js
│   ├── session.routes.js
│   └── user.routes.js
│
├── services/
│   ├── event.services.js
│   └── user.services.js
│
├── utils/
│   ├── jwt.utils.js
│   └── password.utils.js
│
├── app.js
└── server.js
```

### Controllers

Se encargan principalmente de recibir las solicitudes HTTP y devolver las respuestas correspondientes.

### Services

Contienen las reglas de negocio y validaciones de la aplicación.

### Repositories

Se encargan del acceso y las operaciones sobre MongoDB mediante Mongoose.

### Models

Definen los esquemas utilizados por MongoDB.

### DTO

Controlan y organizan los datos que son enviados al cliente.

### Middlewares

Se encargan de la autenticación, autorización y validación de permisos.

---

# Eventos

La entidad `Event` representa los diferentes eventos disponibles dentro de la plataforma.

Cada evento contiene:

```text
title
description
category
date
location
capacity
price
status
organizer
```

El campo `organizer` es una referencia mediante `ObjectId` al modelo de usuarios.

No se almacena el usuario completo embebido dentro del evento.

---

# Modelo Event

Los campos del evento cumplen las siguientes reglas:

| Campo         | Tipo     | Requerido | Regla                                         |
| :------------ | :------- | :-------: | :-------------------------------------------- |
| `title`       | String   |     ✅     | Obligatorio                                   |
| `description` | String   |     ✅     | Obligatorio                                   |
| `category`    | String   |     ✅     | Obligatorio                                   |
| `date`        | Date     |     ✅     | No puede ser pasada al crear                  |
| `location`    | String   |     ✅     | Obligatorio                                   |
| `capacity`    | Number   |     ✅     | Mayor a 0                                     |
| `price`       | Number   |     ✅     | Mayor o igual a 0                             |
| `status`      | String   |     ❌     | `draft`, `published`, `cancelled`, `finished` |
| `organizer`   | ObjectId |     ✅     | Referencia al usuario organizador             |

---

# Estados de los eventos

Los eventos pueden tener los siguientes estados:

```text
draft
published
cancelled
finished
```

Un evento nuevo comienza por defecto como:

```text
draft
```

### `draft`

Evento creado pero todavía no publicado.

### `published`

Evento disponible para ser consultado públicamente.

### `cancelled`

Evento cancelado.

Los eventos cancelados **no se eliminan físicamente de MongoDB**.

### `finished`

Evento que ya finalizó.

---

# Reglas de negocio de eventos

La lógica de negocio se encuentra dentro de los Services y no directamente en las rutas.

## Fecha

No se permite crear un evento con una fecha pasada.

Ejemplo inválido:

```json
{
    "date": "2020-01-01"
}
```

---

## Capacidad

La capacidad debe ser mayor a cero.

```text
capacity > 0
```

Por ejemplo:

```json
{
    "capacity": 0
}
```

es inválido.

---

## Precio

El precio debe ser mayor o igual a cero.

```text
price >= 0
```

Por ejemplo:

```json
{
    "price": -100
}
```

es inválido.

---

## Eventos cancelados

Un evento con estado:

```text
cancelled
```

no puede volver a modificarse.

---

## Publicación

No se puede publicar un evento que ya se encuentre:

```text
finished
```

o:

```text
cancelled
```

---

## Cancelación

La cancelación se realiza modificando el estado:

```text
cancelled
```

No se realiza un `delete` físico del documento.

---

## Organizador

El organizador del evento se obtiene automáticamente del usuario autenticado.

El cliente no puede establecer o cambiar el organizador enviando:

```json
{
    "organizer": "..."
}
```

El servidor utiliza:

```js
req.user.id
```

para establecer el propietario del evento.

---

# Endpoints de eventos

## Obtener todos los eventos

```http
GET /api/events
```

Endpoint público.

Devuelve los eventos utilizando paginación.

Ejemplo:

```text
http://localhost:3000/api/events
```

Respuesta:

```json
{
    "data": [],
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
}
```

---

## Obtener evento por ID

```http
GET /api/events/:eventId
```

Endpoint público.

Ejemplo:

```text
http://localhost:3000/api/events/65f123456789abcdef123456
```

Si el evento no existe:

```http
404
```

---

## Crear evento

```http
POST /api/events
```

Requiere autenticación.

Roles permitidos:

```text
organizer
admin
```

Ejemplo:

```json
{
    "title": "Workshop de Node.js",
    "description": "Introducción al desarrollo backend",
    "category": "workshop",
    "date": "2026-12-15T18:00:00.000Z",
    "location": "Montevideo",
    "capacity": 50,
    "price": 1000
}
```

El campo `organizer` no debe enviarse.

El servidor lo asigna automáticamente utilizando el usuario autenticado.

Respuesta esperada:

```http
201 Created
```

---

## Modificar evento

```http
PUT /api/events/:eventId
```

Requiere autenticación.

Roles permitidos:

```text
organizer
admin
```

Un `organizer` solamente puede modificar sus propios eventos.

Un `admin` puede modificar cualquier evento.

Ejemplo:

```json
{
    "title": "Workshop de Node.js actualizado",
    "description": "Nueva descripción",
    "category": "workshop",
    "date": "2026-12-20T18:00:00.000Z",
    "location": "Montevideo",
    "capacity": 60,
    "price": 1200
}
```

No se permite modificar el propietario del evento mediante el body.

---

## Cambiar estado de un evento

```http
PATCH /api/events/:eventId/status
```

Requiere autenticación.

Roles permitidos:

```text
organizer
admin
`
```
