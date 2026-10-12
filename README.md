# Plataforma de Eventos e Inscripciones

## Datos del proyecto

- **Alumno:** Mathias Horvat
- **Proyecto:** Plataforma de Eventos e Inscripciones
- **Tipo:** API REST Backend

## Descripción

La Plataforma de Eventos e Inscripciones es una API backend desarrollada con Node.js, Express y MongoDB. Permite gestionar usuarios, eventos e inscripciones mediante tickets, aplicando autenticación, autorización por roles y reglas de negocio.

La aplicación permite:

- Crear, consultar, modificar y cancelar eventos.
- Gestionar usuarios y roles.
- Registrar usuarios e iniciar sesión.
- Autenticar usuarios mediante Passport.js y JWT.
- Autorizar operaciones según el rol y la propiedad de los recursos.
- Crear y cancelar tickets.
- Controlar la capacidad disponible de los eventos.
- Evitar inscripciones duplicadas.
- Enviar emails de confirmación mediante Nodemailer.
- Filtrar, ordenar y paginar eventos.
- Separar las responsabilidades mediante DAO, Repository, Service, Controller y DTO.
- Evitar la exposición de contraseñas y otros datos sensibles en las respuestas de la API.

---

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución.
- **Express.js:** framework para crear la API REST.
- **MongoDB:** base de datos NoSQL.
- **Mongoose:** ODM para interactuar con MongoDB.
- **JavaScript:** lenguaje de programación.
- **Passport.js:** autenticación.
- **Passport-Local:** estrategias de registro e inicio de sesión.
- **Passport-JWT:** validación de usuarios autenticados mediante JWT.
- **JSON Web Token (JWT):** autenticación basada en tokens.
- **bcrypt:** hash y verificación de contraseñas.
- **dotenv:** gestión de variables de entorno.
- **cookie-parser:** lectura de cookies.
- **Nodemailer:** envío de emails.
- **Git y GitHub:** control de versiones.
- **Postman:** pruebas de endpoints.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar a la carpeta del proyecto:

```bash
cd node-backend2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y completar las variables necesarias.

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

Los valores deben corresponder a la configuración de MongoDB, JWT, cookies y el servicio SMTP utilizado para enviar correos.

No se deben subir al repositorio las credenciales reales ni el archivo `.env`. Para documentar la configuración se utiliza `.env.example` con valores vacíos o de ejemplo.

### 4. Iniciar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Por defecto, la API se ejecuta en:

```text
http://localhost:3000
```

Las solicitudes pueden probarse utilizando Postman.

---

## Estructura del proyecto

La aplicación está organizada en capas para separar las responsabilidades y facilitar el mantenimiento.

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
│   ├── event.dao.js
│   ├── ticket.dao.js
│   └── user.dao.js
│
├── dto/
│   ├── event.dto.js
│   ├── ticket.dto.js
│   └── users.dto.js
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

> La estructura representa la organización prevista para esta versión. Los nombres deben coincidir con los archivos reales del repositorio, respetando mayúsculas, minúsculas y extensiones.

---

## Arquitectura por capas

El proyecto utiliza la siguiente arquitectura:

```text
Routes
   ↓
Middlewares
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
DAO
   ↓
Models
   ↓
MongoDB
```

### Routes

Definen los endpoints y conectan cada solicitud con el controlador correspondiente. También aplican los middlewares de autenticación y autorización cuando son necesarios.

### Controllers

Reciben las solicitudes HTTP, obtienen los parámetros y datos enviados por el cliente, llaman a los services y devuelven las respuestas con sus códigos HTTP correspondientes.

No deben contener consultas directas a los modelos de Mongoose ni concentrar las reglas de negocio.

### Services

Contienen la lógica de negocio y las validaciones de la aplicación.

Entre sus responsabilidades se encuentran comprobar la disponibilidad de eventos, controlar los cupos, evitar inscripciones duplicadas y validar los permisos necesarios para determinadas operaciones.

Los services acceden a los datos mediante los repositories.

### Repositories

Actúan como intermediarios entre los services y los DAO. Coordinan las operaciones de acceso a datos y permiten mantener la lógica de negocio separada de las consultas a la base de datos.

### DAO (Data Access Object)

Los DAO encapsulan las operaciones de persistencia sobre cada entidad, utilizando los modelos de Mongoose.

Cada entidad dispone de su propio DAO para operaciones como crear, buscar, actualizar o cancelar registros.

El objetivo es centralizar el acceso a los modelos y evitar que los controllers, services o repositories realicen consultas directas mediante Mongoose.

### Models

Definen los esquemas y las reglas de validación de los documentos almacenados en MongoDB.

### DTO (Data Transfer Object)

Los DTO controlan qué información se devuelve al cliente y cómo se estructura la respuesta.

Se utilizan para exponer los campos necesarios de usuarios, eventos y tickets, evitando revelar información sensible, como las contraseñas.

### Middlewares

Se encargan de verificar la autenticación, los roles y los permisos de acceso antes de ejecutar determinadas operaciones.

---

## Usuarios, autenticación y autorización

La plataforma utiliza tres roles:

- `user`
- `organizer`
- `admin`

El rol predeterminado de los usuarios registrados es `user`.

### User

Puede:

- Registrarse e iniciar sesión.
- Consultar eventos disponibles.
- Inscribirse a eventos publicados.
- Consultar sus propios tickets.
- Cancelar sus propios tickets.

No puede crear o modificar eventos ni acceder a las rutas administrativas.

### Organizer

Puede:

- Consultar eventos.
- Crear eventos.
- Modificar y cambiar el estado de sus propios eventos.
- Consultar los tickets de sus propios eventos.
- Inscribirse a eventos y gestionar sus propios tickets.

No puede modificar eventos de otros organizadores ni acceder a las operaciones administrativas exclusivas del administrador.

### Admin

Puede:

- Consultar y crear eventos.
- Modificar y cambiar el estado de cualquier evento.
- Gestionar usuarios.
- Consultar los tickets de cualquier evento.
- Cancelar tickets de cualquier usuario.
- Acceder a las rutas administrativas.

### Matriz de permisos

| Acción | User | Organizer | Admin |
|---|:---:|:---:|:---:|
| Consultar eventos | Sí | Sí | Sí |
| Crear eventos | No | Sí | Sí |
| Modificar eventos propios | No | Sí | Sí |
| Modificar cualquier evento | No | No | Sí |
| Consultar todos los usuarios | No | No | Sí |
| Inscribirse a eventos | Sí | Sí | Sí |
| Consultar tickets propios | Sí | Sí | Sí |
| Consultar tickets de un evento propio | No | Sí | Sí |
| Consultar tickets de cualquier evento | No | No | Sí |
| Cancelar ticket propio | Sí | Sí | Sí |
| Cancelar cualquier ticket | No | No | Sí |

---

## Registro e inicio de sesión

La autenticación se implementa con Passport.js, JWT y cookies.

### Registro

```http
POST /api/sessions/register
```

El registro valida los datos del usuario y almacena la contraseña utilizando un hash generado con bcrypt.

El registro público no permite elegir libremente un rol privilegiado. Aunque el cliente envíe `role` en el body, el servidor debe impedir que se registre directamente como `organizer` o `admin`.

### Inicio de sesión

```http
POST /api/sessions/login
```

Passport valida el email y la contraseña. Si las credenciales son correctas, se genera un JWT y se almacena en una cookie llamada `currentUser`.

### Usuario autenticado

```http
GET /api/sessions/current
```

Permite consultar la información del usuario autenticado.

La respuesta utiliza un DTO seguro y no debe exponer la contraseña ni su hash.

### Cierre de sesión

```http
POST /api/sessions/logout
```

Permite cerrar la sesión eliminando la cookie de autenticación, de acuerdo con la configuración implementada.

### Protección de rutas

Las rutas protegidas utilizan Passport para validar el JWT:

```js
passport.authenticate("current", { session: false })
```

Después de autenticar al usuario, los middlewares verifican el rol y los permisos necesarios para cada operación.

### Seguridad de las contraseñas

Las contraseñas se almacenan como hashes generados con bcrypt. No se deben guardar ni devolver contraseñas en texto plano.

Los DTO de usuarios y tickets evitan exponer el campo `password`, incluso cuando una respuesta incluye datos relacionados mediante `populate()`.

---

## Eventos

La entidad `Event` representa un evento de la plataforma.

Cada evento contiene los siguientes campos:

| Campo | Tipo | Regla |
|---|---|---|
| `title` | String | Obligatorio |
| `description` | String | Obligatorio |
| `category` | String | Obligatorio |
| `date` | Date | Obligatorio y no pasada al crear |
| `location` | String | Obligatorio |
| `capacity` | Number | Mayor que cero |
| `price` | Number | Mayor o igual a cero |
| `status` | String | Estado permitido |
| `organizer` | ObjectId | Referencia al usuario organizador |

El campo `organizer` es una referencia al usuario almacenado en MongoDB. No se almacena el usuario completo dentro del documento del evento.

### Estados de los eventos

Los estados permitidos son:

- `draft`: evento creado, todavía no publicado.
- `published`: evento publicado y disponible para inscripciones.
- `cancelled`: evento cancelado.
- `finished`: evento finalizado.

Los eventos nuevos comienzan en estado `draft`.

Los eventos cancelados se conservan en la base de datos; no se eliminan físicamente.

### Reglas de negocio

- No se permite crear un evento con una fecha pasada.
- La capacidad debe ser mayor que cero.
- El precio debe ser mayor o igual a cero.
- Un evento cancelado no puede volver a modificarse.
- No se puede publicar un evento cancelado o finalizado.
- La cancelación se realiza cambiando el estado del evento.
- El organizador se obtiene del usuario autenticado y no del body enviado por el cliente.
- Un organizador solo puede modificar sus propios eventos.
- Un administrador puede modificar cualquier evento.

---

## Endpoints de eventos

### Obtener eventos

```http
GET /api/events
```

Endpoint público. Permite consultar eventos y utilizar filtros, ordenamiento y paginación.

Ejemplos:

```http
GET /api/events?page=1&limit=5
GET /api/events?status=published&category=workshop&page=2&limit=5
```

Los parámetros disponibles dependen de los filtros y opciones implementados en el service.

### Obtener un evento por ID

```http
GET /api/events/:eventId
```

Endpoint público.

Si el evento no existe, debe responder con `404 Not Found`.

### Crear evento

```http
POST /api/events
```

Requiere autenticación y el rol `organizer` o `admin`.

Ejemplo de body:

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

El cliente no debe enviar el campo `organizer`: el servidor asigna el usuario autenticado como propietario del evento.

### Modificar evento

```http
PUT /api/events/:eventId
```

Requiere autenticación y el rol `organizer` o `admin`.

El organizador solamente puede modificar sus propios eventos. El administrador puede modificar cualquier evento.

### Cambiar el estado de un evento

```http
PATCH /api/events/:eventId/status
```

Requiere autenticación y permisos para gestionar el evento.

Ejemplo:

```json
{
  "status": "published"
}
```

El service valida que el cambio de estado cumpla las reglas de negocio.

---

## Tickets e inscripciones

La entidad `Ticket` representa la inscripción de un usuario a un evento.

Cada ticket contiene referencias mediante `ObjectId` al usuario y al evento correspondientes.

### Modelo Ticket

| Campo | Tipo | Regla |
|---|---|---|
| `user` | ObjectId | Referencia al usuario |
| `event` | ObjectId | Referencia al evento |
| `status` | String | `confirmed`, `pending` o `cancelled` |
| `quantity` | Number | Entero mayor que cero |
| `reservationCode` | String | Código único de reserva |
| `createdAt` | Date | Fecha de creación |
| `cancelledAt` | Date o `null` | Fecha de cancelación |

### Estados de los tickets

- `confirmed`: inscripción confirmada.
- `pending`: inscripción pendiente.
- `cancelled`: inscripción cancelada.

Los tickets cancelados se conservan en MongoDB y dejan de ocupar cupos. La fecha de cancelación se registra en `cancelledAt`.

### Flujo de inscripción

Para crear una inscripción, el sistema debe:

1. Verificar que el usuario esté autenticado.
2. Comprobar que el evento exista.
3. Verificar que el evento esté publicado.
4. Comprobar que la fecha del evento no haya pasado.
5. Validar que `quantity` sea un entero mayor que cero.
6. Verificar que el usuario no tenga otra inscripción activa para el evento.
7. Calcular los cupos ocupados.
8. Comprobar que haya capacidad suficiente.
9. Generar un código único de reserva.
10. Crear el ticket.
11. Enviar un email de confirmación.

### Control de capacidad

Los tickets `confirmed` y `pending` ocupan cupos. Los tickets `cancelled` no se incluyen en el cálculo.

La cantidad ocupada se calcula sumando el campo `quantity` de todos los tickets activos.

Ejemplo:

```text
Capacidad del evento: 50

Ticket 1: confirmed - quantity 2
Ticket 2: confirmed - quantity 3
Ticket 3: cancelled - quantity 4
Ticket 4: pending   - quantity 1

Cupos ocupados: 2 + 3 + 1 = 6
Cupos disponibles: 50 - 6 = 44
```

Al cancelar un ticket, sus cupos dejan de contar como ocupados.

### Prevención de inscripciones duplicadas

Un usuario no puede tener más de una inscripción activa para el mismo evento.

Se consideran activas las inscripciones con estado `confirmed` o `pending`.

Si el usuario ya tiene una inscripción activa, el sistema rechaza la nueva solicitud. Si su inscripción anterior fue cancelada, puede volver a inscribirse.

---

## Endpoints de tickets

### Crear inscripción

```http
POST /api/events/:eventId/tickets
```

Requiere autenticación.

Ejemplo de body:

```json
{
  "quantity": 1
}
```

Respuesta de ejemplo:

```json
{
  "status": "success",
  "message": "Inscripcion realizada correctamente",
  "payload": {
    "id": "TICKET_ID",
    "status": "confirmed",
    "quantity": 1,
    "reservationCode": "TCK-XXXXXXXX",
    "cancelledAt": null,
    "event": {
      "id": "EVENT_ID"
    },
    "user": {
      "id": "USER_ID"
    }
  }
}
```

Los identificadores son ilustrativos. Los datos reales de la respuesta dependen de los campos incluidos en el DTO.

### Consultar mis tickets

```http
GET /api/tickets/my-tickets
```

Requiere autenticación.

Devuelve las inscripciones del usuario autenticado. La información del evento puede incluir el título, la fecha y la ubicación.

El usuario no puede consultar los tickets privados de otras personas mediante este endpoint.

### Consultar tickets de un evento

```http
GET /api/events/:eventId/tickets
```

Requiere autenticación.

Permisos:

- `admin`: puede consultar los tickets de cualquier evento.
- `organizer`: puede consultar los tickets de sus propios eventos.
- `user`: no puede consultar los tickets de un evento mediante este endpoint.

### Cancelar ticket

```http
PATCH /api/tickets/:ticketId/cancel
```

Requiere autenticación.

Permisos:

- El propietario puede cancelar su propio ticket.
- El administrador puede cancelar cualquier ticket.
- Otro usuario no puede cancelar un ticket que no le pertenece.

La cancelación cambia el estado a `cancelled`, registra `cancelledAt` y conserva el documento en la base de datos. Un ticket que ya está cancelado no debe cancelarse nuevamente.

---

## Notificaciones por email

La aplicación utiliza Nodemailer para enviar un email de confirmación después de crear correctamente una inscripción.

El mensaje puede incluir:

- Código de reserva.
- Nombre del evento.
- Cantidad de entradas.

La conexión SMTP se configura mediante variables de entorno. Las credenciales no deben incluirse en el repositorio.

---

## DTO y protección de datos

Los DTO permiten controlar la información que se envía al cliente.

### UserDTO

Devuelve los datos públicos necesarios del usuario, como:

- ID.
- Nombre.
- Apellido.
- Email.
- Rol.

No incluye `password`.

### EventDTO

Organiza la información del evento y los datos seleccionados del organizador, sin devolver innecesariamente todo el documento del usuario relacionado.

### TicketDTO

Devuelve los datos de la inscripción y la información seleccionada del evento y del usuario.

Cuando se utiliza `populate()`, la respuesta debe seguir evitando la exposición de contraseñas u otros campos sensibles.

Esta separación permite mantener una respuesta consistente y controlar los datos públicos de la API.

---

## Respuestas y códigos HTTP

La API utiliza códigos HTTP para indicar el resultado de las operaciones.

| Código | Significado |
|---|---|
| `200 OK` | Operación realizada correctamente |
| `201 Created` | Recurso creado correctamente |
| `400 Bad Request` | Datos inválidos o regla de negocio incumplida |
| `401 Unauthorized` | Usuario no autenticado o credenciales inválidas |
| `403 Forbidden` | Usuario autenticado sin permisos suficientes |
| `404 Not Found` | Recurso inexistente |
| `409 Conflict` | Conflicto, por ejemplo, un recurso duplicado |
| `500 Internal Server Error` | Error interno del servidor |

La respuesta concreta depende de cómo se gestione cada error en el service y el controller.

### Ejemplos de errores de negocio

- Evento inexistente.
- Evento no publicado.
- Evento finalizado.
- Cantidad de entradas inválida.
- Capacidad insuficiente.
- Inscripción duplicada.
- Ticket inexistente.
- Ticket ya cancelado.
- Usuario sin permisos para modificar un evento.
- Usuario sin permisos para cancelar un ticket.

---

## Pre-entrega 7 — Tickets, inscripciones y control de cupos

Esta etapa incorporó el flujo de inscripción a eventos mediante tickets.

Se implementaron las siguientes funcionalidades:

- Modelo `Ticket`.
- Referencias entre usuarios, eventos y tickets.
- Estados de inscripción.
- Cantidad de entradas por reserva.
- Código único de reserva.
- Control de capacidad.
- Prevención de inscripciones duplicadas.
- Consulta de tickets propios.
- Consulta de tickets por evento con autorización.
- Cancelación de tickets.
- Registro de la fecha de cancelación.
- Liberación de cupos.
- Validación de propiedad y permisos.
- Envío de emails de confirmación.

## Pre-entrega 8 — Refactorización y separación de responsabilidades

Esta etapa organiza el acceso a datos y la transformación de las respuestas mediante una arquitectura por capas.

Los principales objetivos son:

- Separar los controllers de la lógica de negocio.
- Centralizar las reglas de negocio en los services.
- Acceder a los datos mediante repositories.
- Encapsular las operaciones de persistencia en DAO.
- Utilizar DTO para controlar la información devuelta.
- Evitar que los controllers, services y repositories consulten directamente los modelos de Mongoose.
- Evitar la exposición de contraseñas en las respuestas.
- Mantener la autenticación y autorización mediante Passport y JWT.
- Conservar las funcionalidades de eventos, usuarios e inscripciones.
- Mantener respuestas HTTP consistentes para los errores y las operaciones exitosas.

---

## Pruebas con Postman

Los endpoints pueden probarse mediante Postman, verificando tanto las operaciones exitosas como los casos de error.

Se deben comprobar, como mínimo, los siguientes escenarios:

1. Registrar un usuario.
2. Iniciar sesión y recibir la cookie `currentUser`.
3. Consultar el usuario autenticado mediante `/api/sessions/current`.
4. Verificar que la respuesta del usuario no incluya `password`.
5. Consultar eventos, aplicar filtros y comprobar la paginación.
6. Crear un evento con un rol autorizado.
7. Verificar que un usuario no autorizado no pueda crear o modificar eventos.
8. Crear una inscripción a un evento publicado.
9. Comprobar el rechazo de una inscripción duplicada activa.
10. Verificar el control de cupos.
11. Consultar los tickets propios.
12. Cancelar un ticket propio.
13. Comprobar que la cancelación libere cupos.
14. Verificar que un usuario no pueda cancelar un ticket ajeno.
15. Consultar los tickets de un evento con los permisos correspondientes.
16. Verificar que los datos de usuario incluidos en los tickets no expongan contraseñas.
17. Comprobar que las rutas administrativas rechacen a los usuarios sin el rol adecuado.

---

## Base de datos

La aplicación utiliza MongoDB mediante Mongoose.

Las principales colecciones son:

```text
users
events
tickets
```

Las relaciones se representan mediante referencias `ObjectId`:

```text
User
  │
  └── Ticket
        │
        └── Event
```

Los documentos de eventos y tickets mantienen referencias a sus entidades relacionadas, evitando almacenar innecesariamente objetos completos dentro de cada documento.

---

## Variables de entorno y seguridad

El proyecto utiliza variables de entorno para gestionar las credenciales y la configuración.

- `.env`: contiene la configuración local y las credenciales.
- `.env.example`: documenta las variables necesarias sin exponer secretos.
- `.gitignore`: debe excluir `.env`, `node_modules` y otros archivos locales que no deban subirse al repositorio.

Las contraseñas de los usuarios se almacenan mediante bcrypt. La autenticación utiliza JWT en una cookie `HttpOnly`, y las respuestas se construyen con DTO para no exponer campos sensibles.

---

## Control de versiones

El proyecto utiliza Git para el control de versiones y GitHub para alojar el código fuente.

La estructura por capas permite mantener el código organizado, reducir el acoplamiento entre componentes y facilitar futuras modificaciones.

**Proyecto:** Plataforma de Eventos e Inscripciones  
**Alumno:** Mathias Horvat


