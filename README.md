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
* Crear y cancelar tickets.
* Controlar la disponibilidad de cupos.
* Evitar inscripciones duplicadas.
* Enviar emails de confirmación de inscripción.
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
* **Nodemailer** — Envío de emails de confirmación.
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
* Inscribirse a eventos publicados.
* Consultar sus propios tickets.
* Cancelar sus propios tickets.

No puede:

* Crear eventos.
* Modificar eventos.
* Cancelar eventos.
* Consultar los tickets de eventos de otros usuarios.
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
* Consultar los tickets de sus propios eventos.

No puede:

* Modificar eventos pertenecientes a otros organizadores.
* Cancelar eventos pertenecientes a otros organizadores.
* Consultar los tickets de eventos pertenecientes a otros organizadores.
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
* Consultar tickets de cualquier evento.
* Cancelar tickets de cualquier usuario.
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
| Inscribirse a eventos              |    ✅   |      ✅      |    ✅    |
| Ver propios tickets                |    ✅   |      ✅      |    ✅    |
| Ver tickets de un evento propio    |    ❌   |      ✅      |    ✅    |
| Ver tickets de cualquier evento    |    ❌   |      ❌      |    ✅    |
| Cancelar ticket propio             |    ✅   |      ✅      |    ✅    |
| Cancelar cualquier ticket          |    ❌   |      ❌      |    ✅    |

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
│   ├── mail.js
│   └── passport.config.js
│
├── controllers/
│   ├── event.controllers.js
│   ├── session.controller.js
│   ├── ticket.controller.js
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
│   ├── ticket.model.js
│   └── user.model.js
│
├── repositories/
│   ├── event.repository.js
│   ├── ticket.repository.js
│   └── user.repository.js
│
├── routes/
│   ├── event.routes.js
│   ├── session.routes.js
│   ├── ticket.routes.js
│   └── user.routes.js
│
├── services/
│   ├── event.services.js
│   ├── mail.service.js
│   ├── ticket.service.js
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

Evento disponible para ser consultado y recibir inscripciones.

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

## Capacidad

La capacidad debe ser mayor a cero.

```text
capacity > 0
```

## Precio

El precio debe ser mayor o igual a cero.

```text
price >= 0
```

## Eventos cancelados

Un evento con estado:

```text
cancelled
```

no puede volver a modificarse.

## Publicación

No se puede publicar un evento que ya se encuentre:

```text
finished
```

o:

```text
cancelled
```

## Cancelación

La cancelación se realiza modificando el estado:

```text
cancelled
```

No se realiza un `delete` físico del documento.

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

Devuelve los eventos utilizando paginación, filtros y ordenamiento.

Ejemplo:

```text
http://localhost:3000/api/events
```

También se pueden realizar consultas como:

```text
http://localhost:3000/api/events?status=published&category=workshop&page=2&limit=5
```

---

## Obtener evento por ID

```http
GET /api/events/:eventId
```

Endpoint público.

Si el evento no existe:

```http
404 Not Found
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
```

Ejemplo:

```json
{
    "status": "published"
}
```

---

# Tickets e inscripciones

La plataforma utiliza una entidad `Ticket` para representar la inscripción de un usuario a un evento.

Un ticket contiene una referencia al usuario y una referencia al evento mediante `ObjectId`.

No se almacenan objetos completos de usuarios o eventos dentro del ticket.

---

# Modelo Ticket

El modelo contiene:

| Campo             | Tipo     | Regla                                  |
| :---------------- | :------- | :------------------------------------- |
| `user`            | ObjectId | Referencia al usuario                  |
| `event`           | ObjectId | Referencia al evento                   |
| `status`          | String   | `confirmed`, `pending`, `cancelled`    |
| `quantity`        | Number   | Mayor a 0                              |
| `reservationCode` | String   | Código único de reserva                |
| `createdAt`       | Date     | Fecha de creación                      |
| `cancelledAt`     | Date     | Fecha de cancelación, puede ser `null` |

Los estados permitidos son:

```text
confirmed
pending
cancelled
```

---

# Estados de los tickets

### `confirmed`

La inscripción fue confirmada correctamente y ocupa los cupos correspondientes.

### `pending`

Inscripción pendiente. Los tickets pendientes también ocupan cupos.

### `cancelled`

La inscripción fue cancelada.

Los tickets cancelados **no se eliminan de MongoDB** y dejan de ocupar cupos del evento.

Al cancelar un ticket se guarda la fecha en:

```text
cancelledAt
```

---

# Flujo de inscripción

Para realizar una inscripción:

1. El usuario debe estar autenticado.
2. Se busca el evento.
3. Se verifica que el evento exista.
4. Se verifica que el evento esté en estado `published`.
5. Se verifica que el evento no haya finalizado.
6. Se valida que `quantity` sea un número entero mayor a cero.
7. Se buscan los tickets activos del evento.
8. Se verifica que el usuario no tenga otra inscripción activa para ese evento.
9. Se calculan los cupos ocupados.
10. Se verifica que existan suficientes cupos.
11. Se genera un código único de reserva.
12. Se crea el ticket.
13. Se envía un email de confirmación al usuario.

---

# Regla de capacidad

La capacidad disponible se calcula considerando únicamente los tickets con estado:

```text
confirmed
pending
```

Los tickets:

```text
cancelled
```

no ocupan capacidad.

La cantidad ocupada se calcula sumando el campo `quantity` de los tickets activos.

Ejemplo:

```text
Capacidad del evento: 50

Ticket 1: confirmed - quantity 2
Ticket 2: confirmed - quantity 3
Ticket 3: cancelled - quantity 4
Ticket 4: pending   - quantity 1

Cupos ocupados = 2 + 3 + 1 = 6

Cupos disponibles = 50 - 6 = 44
```

Por lo tanto, una cancelación libera automáticamente los cupos correspondientes.

---

# Regla de inscripción duplicada

Un usuario no puede tener más de una inscripción activa para el mismo evento.

Se considera inscripción activa cuando el ticket tiene estado:

```text
confirmed
```

o:

```text
pending
```

Si el usuario ya posee una inscripción activa, la nueva inscripción es rechazada.

Una inscripción previamente cancelada no ocupa cupo y permite realizar una nueva inscripción.

---

# Endpoints de Tickets

## Crear inscripción

```http
POST /api/events/:eventId/tickets
```

Requiere autenticación.

Ejemplo:

```json
{
    "quantity": 1
}
```

Respuesta exitosa:

```http
201 Created
```

Ejemplo de respuesta:

```json
{
    "status": "success",
    "message": "Inscripcion realizada correctamente",
    "payload": {
        "user": "USER_ID",
        "event": "EVENT_ID",
        "status": "confirmed",
        "quantity": 1,
        "reservationCode": "TCK-XXXXXXXX"
    }
}
```

---

## Consultar mis tickets

```http
GET /api/tickets/my-tickets
```

Requiere autenticación.

El usuario solamente puede consultar sus propias inscripciones.

La información del evento incluye:

```text
title
date
location
```

No se exponen datos sensibles de otros usuarios.

---

## Consultar tickets de un evento

```http
GET /api/events/:eventId/tickets
```

Requiere autenticación.

Permisos:

* `admin` puede consultar los tickets de cualquier evento.
* `organizer` puede consultar los tickets de sus propios eventos.
* Un `organizer` no puede consultar los tickets de eventos de otro organizador.
* Un `user` no puede consultar los tickets de un evento.

Si el usuario no posee permisos:

```http
403 Forbidden
```

---

## Cancelar ticket

```http
PATCH /api/tickets/:ticketId/cancel
```

Requiere autenticación.

Permisos:

* El propietario del ticket puede cancelarlo.
* Un `admin` puede cancelar cualquier ticket.
* Otro usuario no puede cancelar el ticket.

La cancelación:

* Cambia el estado a `cancelled`.
* Guarda la fecha en `cancelledAt`.
* No elimina el ticket.
* Libera los cupos ocupados por la inscripción.
* No permite volver a cancelar un ticket que ya está cancelado.

Ejemplo de respuesta:

```json
{
    "status": "success",
    "message": "Ticket cancelado correctamente",
    "payload": {
        "_id": "TICKET_ID",
        "status": "cancelled",
        "quantity": 1,
        "reservationCode": "TCK-XXXXXXXX",
        "cancelledAt": "2026-10-05T16:18:45.401Z"
    }
}
```

---

# Notificaciones por email

La aplicación utiliza **Nodemailer** para enviar un email de confirmación cuando un usuario realiza correctamente una inscripción.

El email contiene información básica de la reserva:

* Código de reserva.
* Nombre del evento.
* Cantidad de entradas.

El envío se realiza luego de crear correctamente el ticket.

---

# Variables de entorno

Las variables relacionadas con el envío de emails son:

```env
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
```

Estas variables deben configurarse en el archivo `.env`.

El archivo `.env` no debe subirse al repositorio.

Se recomienda utilizar `.env.example` como referencia:

```env
PORT=3000

MONGO_URL=

JWT_SECRET=
JWT_EXPIRES_IN=

NODE_ENV=development
COOKIE_SECURE=false
COOKIE_SECRET=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
```

---

# Respuestas y errores

La API utiliza códigos HTTP para representar el resultado de las operaciones.

Algunos ejemplos:

| Código | Significado                            |
| :----: | :------------------------------------- |
|  `200` | Operación realizada correctamente      |
|  `201` | Recurso creado correctamente           |
|  `400` | Error de validación o regla de negocio |
|  `401` | Usuario no autenticado                 |
|  `403` | Usuario autenticado pero sin permisos  |
|  `404` | Recurso no encontrado                  |
|  `500` | Error interno del servidor             |

---

# Ejemplos de errores de inscripción

### Evento inexistente

```text
Evento no encontrado
```

### Evento no publicado

```text
El evento no está disponible para inscripciones
```

### Evento finalizado

```text
El evento ya ha finalizado
```

### Cantidad inválida

```text
La cantidad debe ser un número entero mayor a 0
```

### Sin cupos suficientes

```text
No hay cupos suficientes. Cupos disponibles: X
```

### Inscripción duplicada

```text
El usuario ya tiene una inscripción activa para este evento
```

### Ticket inexistente

```text
Ticket no encontrado
```

### Ticket ya cancelado

```text
El ticket ya está cancelado
```

### Sin permisos para cancelar

```text
No tienes permisos para cancelar este ticket
```

---

# Pre-entrega 7 — Tickets, inscripciones y control de cupos

La séptima etapa del proyecto incorpora el flujo completo de inscripción a eventos.

Se implementó:

* Modelo `Ticket`.
* Relación entre usuarios y eventos mediante referencias `ObjectId`.
* Estados `confirmed`, `pending` y `cancelled`.
* Cantidad de entradas por inscripción.
* Código único de reserva.
* Control de capacidad.
* Exclusión de tickets cancelados del cálculo de cupos.
* Prevención de inscripciones duplicadas.
* Consulta de tickets propios.
* Consulta de tickets por evento con autorización.
* Cancelación de tickets.
* Registro de `cancelledAt`.
* Liberación de cupos al cancelar.
* Autorización para propietario y administrador.
* Envío de email de confirmación mediante Nodemailer.

---

# Arquitectura

El proyecto utiliza una arquitectura dividida en capas:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Models
   ↓
MongoDB
```

Las rutas reciben las solicitudes HTTP y aplican autenticación y autorización.

Los controllers gestionan las solicitudes y respuestas.

Los services contienen las reglas de negocio.

Los repositories realizan las operaciones sobre MongoDB.

Los models definen las estructuras de los documentos.

Esta separación permite mantener el código organizado y facilita el mantenimiento y la incorporación de nuevas funcionalidades.

---

# Ejecución del proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se ejecuta por defecto en:

```text
http://localhost:3000
```

La API puede ser probada utilizando Postman.

---

# Base de datos

La aplicación utiliza MongoDB mediante Mongoose.

Las principales colecciones utilizadas son:

```text
users
events
tickets
```

Las relaciones entre las entidades se realizan mediante referencias `ObjectId`.

```text
User
  │
  └── Ticket
        │
        └── Event
```

Esto permite mantener separadas las entidades y evitar almacenar información duplicada o documentos completos embebidos.

---

# Control de versiones

El proyecto utiliza Git para el control de versiones y GitHub como repositorio remoto.

El código fuente se encuentra organizado siguiendo una arquitectura por capas para facilitar su mantenimiento y evolución.


