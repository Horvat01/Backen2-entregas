# Plataforma de Eventos e Inscripciones

## Datos del proyecto

- **Alumno:** Mathias Horvat
- **Proyecto:** Plataforma de Eventos e Inscripciones
- **Tipo:** API REST Backend
- **Repositorio:** [GitHub - Backen2-entregas](https://github.com/Horvat01/Backen2-entregas)

## Descripción

La Plataforma de Eventos e Inscripciones es una API backend desarrollada con Node.js, Express y MongoDB. Permite gestionar usuarios, eventos e inscripciones mediante tickets, aplicando autenticación, autorización por roles y reglas de negocio.

La aplicación permite:

- Registrar usuarios e iniciar sesión.
- Gestionar usuarios y roles.
- Crear, consultar, modificar y cancelar eventos.
- Autenticar usuarios mediante Passport.js y JWT.
- Autorizar operaciones según el rol y la propiedad de los recursos.
- Crear y cancelar tickets.
- Controlar la capacidad disponible de los eventos.
- Evitar inscripciones duplicadas.
- Enviar emails de confirmación mediante Nodemailer.
- Filtrar, ordenar y paginar eventos.
- Separar responsabilidades mediante DAO, Repository, Service, Controller y DTO.
- Evitar la exposición de contraseñas y datos sensibles.

---

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución.
- **Express.js:** framework para desarrollar la API REST.
- **MongoDB:** base de datos NoSQL.
- **Mongoose:** ODM para interactuar con MongoDB.
- **JavaScript:** lenguaje de programación.
- **Passport.js:** autenticación.
- **Passport-Local:** estrategias de registro e inicio de sesión.
- **Passport-JWT:** autenticación mediante JWT.
- **JSON Web Token (JWT):** generación y validación de tokens.
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
git clone https://github.com/Horvat01/Backen2-entregas.git
```

Ingresar a la carpeta del proyecto:

```bash
cd Backen2-entregas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y completar las siguientes variables:

```env
PORT=3000

MONGO_URL=

JWT_SECRET=
JWT_EXPIRES_IN=1h

NODE_ENV=development
COOKIE_SECURE=false

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
```

Los valores deben corresponder a la configuración de MongoDB, JWT y el servicio SMTP utilizado para enviar correos.

No se deben subir al repositorio las credenciales reales ni el archivo `.env`. Para documentar la configuración se utiliza `.env.example` sin secretos.

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

### 5. Comprobar el funcionamiento

La API dispone de un endpoint de verificación:

```http
GET /api/health
```

Respuesta esperada:

```json
{
  "status": "success",
  "data": "ok"
}
```

---

## Arquitectura del proyecto

La aplicación está organizada en capas para separar responsabilidades y facilitar el mantenimiento.

```text
src/
├── config/
│   ├── database.js
│   ├── env.js
│   ├── mail.js
│   └── passport.js
│
├── controllers/
│   ├── event.controllers.js
│   ├── session.controller.js
│   └── ticket.controller.js
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
│   └── user.service.js
│
├── utils/
│   ├── jwt.utils.js
│   └── password.utils.js
│
├── app.js
└── server.js
```

### Responsabilidades de las capas

**Routes**

Definen los endpoints y conectan cada solicitud con el controlador correspondiente. También aplican los middlewares de autenticación y autorización.

**Controllers**

Reciben las solicitudes HTTP, obtienen los parámetros y datos enviados por el cliente, llaman a los services y devuelven las respuestas con sus códigos HTTP correspondientes.

**Services**

Contienen la lógica de negocio y las validaciones de la aplicación, como el control de cupos, disponibilidad de eventos, inscripciones duplicadas y permisos.

**Repositories**

Actúan como intermediarios entre los services y los DAO, coordinando las operaciones de acceso a datos.

**DAO (Data Access Object)**

Encapsulan las operaciones de persistencia y son la capa encargada de interactuar directamente con los modelos de Mongoose.

**Models**

Definen los esquemas y las reglas de validación de los documentos almacenados en MongoDB.

**DTO (Data Transfer Object)**

Controlan qué información se devuelve al cliente y cómo se estructura la respuesta, evitando exponer datos sensibles.

**Middlewares**

Verifican la autenticación, los roles y los permisos de acceso antes de ejecutar determinadas operaciones.

---

## Usuarios, autenticación y autorización

La plataforma utiliza tres roles:

- `user`
- `organizer`
- `admin`

El registro público asigna automáticamente el rol `user`.

### User

Puede:

- Registrarse e iniciar sesión.
- Consultar eventos.
- Inscribirse a eventos publicados.
- Consultar sus propios tickets.
- Cancelar sus propios tickets.

No puede crear ni modificar eventos ni acceder a rutas administrativas.

### Organizer

Puede:

- Consultar eventos.
- Crear eventos.
- Modificar y cambiar el estado de sus propios eventos.
- Consultar los tickets de sus propios eventos.
- Gestionar sus propias inscripciones.

No puede modificar eventos de otros organizadores.

### Admin

Puede:

- Consultar y crear eventos.
- Modificar y cambiar el estado de cualquier evento.
- Consultar usuarios.
- Consultar tickets de cualquier evento.
- Cancelar tickets de cualquier usuario.
- Acceder a las operaciones administrativas.

### Matriz de permisos

| Acción | User | Organizer | Admin |
|---|:---:|:---:|:---:|
| Consultar eventos | Sí | Sí | Sí |
| Crear eventos | No | Sí | Sí |
| Modificar eventos propios | No | Sí | Sí |
| Modificar cualquier evento | No | No | Sí |
| Consultar usuarios | No | No | Sí |
| Inscribirse a eventos | Sí | Sí | Sí |
| Consultar tickets propios | Sí | Sí | Sí |
| Consultar tickets de evento propio | No | Sí | Sí |
| Consultar tickets de cualquier evento | No | No | Sí |
| Cancelar ticket propio | Sí | Sí | Sí |
| Cancelar cualquier ticket | No | No | Sí |

---

## Autenticación

La autenticación se implementa mediante Passport.js, JWT y cookies.

### Registro

```http
POST /api/sessions/register
```

Registra un usuario y almacena su contraseña mediante un hash generado con bcrypt.

El registro público no permite elegir libremente roles privilegiados.

### Inicio de sesión

```http
POST /api/sessions/login
```

Passport valida el email y la contraseña. Si las credenciales son correctas, se genera un JWT y se almacena en una cookie llamada `currentUser`.

La cookie se configura como `HttpOnly`.

### Usuario autenticado

```http
GET /api/sessions/current
```

Devuelve la información del usuario autenticado mediante `UserDTO`.

No expone la contraseña ni su hash.

### Cierre de sesión

```http
POST /api/sessions/logout
```

Cierra la sesión eliminando la cookie de autenticación.

### Seguridad

- Las contraseñas se almacenan mediante bcrypt.
- La autenticación utiliza JWT.
- Las rutas protegidas verifican la identidad del usuario.
- Los permisos se controlan mediante roles y propiedad de los recursos.
- Los DTO evitan exponer campos sensibles.

---

## Eventos

La entidad `Event` representa un evento de la plataforma.

### Campos del evento

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

### Estados posibles

- `draft`: evento creado, todavía no publicado.
- `published`: evento publicado y disponible para inscripciones.
- `cancelled`: evento cancelado.
- `finished`: evento finalizado.

Los eventos nuevos comienzan en estado `draft`.

### Reglas de negocio

- No se permite crear eventos con fechas pasadas.
- La capacidad debe ser mayor que cero.
- El precio debe ser mayor o igual a cero.
- Un evento cancelado no puede volver a modificarse.
- No se puede publicar un evento cancelado o finalizado.
- La cancelación se realiza cambiando el estado.
- El organizador se obtiene del usuario autenticado.
- Un organizador solo puede modificar sus propios eventos.
- Un administrador puede modificar cualquier evento.

---

## Endpoints de eventos

### Obtener eventos

```http
GET /api/events
```

Endpoint público.

Permite consultar eventos utilizando filtros, ordenamiento y paginación.

Ejemplos:

```http
GET /api/events?page=1&limit=5

GET /api/events?status=published&category=workshop&page=2&limit=5

GET /api/events?location=Montevideo&sort=date
```

Parámetros disponibles:

- `status`: filtrar por estado.
- `category`: filtrar por categoría.
- `location`: filtrar por ubicación.
- `dateFrom`: fecha inicial.
- `dateTo`: fecha final.
- `page`: número de página.
- `limit`: cantidad de resultados.
- `sort`: campo de ordenamiento.

La respuesta de paginación contiene:

- `data`: eventos obtenidos.
- `page`: página actual.
- `limit`: cantidad de resultados por página.
- `total`: cantidad total de eventos.
- `totalPages`: cantidad total de páginas.

### Obtener evento por ID

```http
GET /api/events/:eventId
```

Endpoint público.

### Crear evento

```http
POST /api/events
```

Requiere autenticación y rol `organizer` o `admin`.

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

El cliente no debe enviar el campo `organizer`. El servidor asigna el usuario autenticado como propietario.

### Modificar evento

```http
PUT /api/events/:eventId
```

Requiere autenticación y rol `organizer` o `admin`.

El organizador solo puede modificar sus propios eventos.

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

---

## Tickets e inscripciones

La entidad `Ticket` representa la inscripción de un usuario a un evento.

### Campos del ticket

| Campo | Tipo | Regla |
|---|---|---|
| `user` | ObjectId | Referencia al usuario |
| `event` | ObjectId | Referencia al evento |
| `status` | String | `confirmed`, `pending` o `cancelled` |
| `quantity` | Number | Entero mayor que cero |
| `reservationCode` | String | Código único de reserva |
| `createdAt` | Date | Fecha de creación |
| `cancelledAt` | Date o null | Fecha de cancelación |

### Estados de los tickets

- `confirmed`: inscripción confirmada.
- `pending`: inscripción pendiente.
- `cancelled`: inscripción cancelada.

Los tickets cancelados se conservan en MongoDB y dejan de ocupar cupos.

### Flujo de inscripción

Para crear una inscripción, el sistema verifica:

1. Que el usuario esté autenticado.
2. Que el evento exista.
3. Que el evento esté publicado.
4. Que la fecha del evento no haya pasado.
5. Que la cantidad sea un entero mayor que cero.
6. Que el usuario no tenga otra inscripción activa para ese evento.
7. Que existan cupos suficientes.
8. Que se genere un código único de reserva.
9. Que se cree el ticket.
10. Que se envíe el email de confirmación.

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

### Prevención de inscripciones duplicadas

Un usuario no puede tener más de una inscripción activa para el mismo evento.

Se consideran activas las inscripciones `confirmed` y `pending`.

Si una inscripción anterior fue cancelada, el usuario puede volver a inscribirse.

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

La inscripción genera un código de reserva y envía un email de confirmación.

### Consultar mis tickets

```http
GET /api/tickets/my-tickets
```

Requiere autenticación.

Devuelve las inscripciones del usuario autenticado.

### Consultar tickets de un evento

```http
GET /api/events/:eventId/tickets
```

Requiere autenticación.

Permisos:

- `admin`: puede consultar los tickets de cualquier evento.
- `organizer`: puede consultar los tickets de sus propios eventos.
- `user`: no puede consultar los tickets mediante este endpoint.

### Cancelar ticket

```http
PATCH /api/tickets/:ticketId/cancel
```

Requiere autenticación.

Permisos:

- El propietario puede cancelar su propio ticket.
- El administrador puede cancelar cualquier ticket.
- Otro usuario no puede cancelar un ticket ajeno.

La cancelación cambia el estado a `cancelled`, registra `cancelledAt` y conserva el documento en MongoDB.

---

## Gestión de usuarios

### Consultar usuarios

```http
GET /api/users
```

Requiere autenticación y rol `admin`.

Devuelve la información de los usuarios mediante DTO, sin exponer contraseñas.

---

## Notificaciones por email

La aplicación utiliza Nodemailer para enviar un email de confirmación después de crear una inscripción.

El mensaje puede incluir:

- Código de reserva.
- Nombre del evento.
- Cantidad de entradas.

La conexión SMTP se configura mediante variables de entorno. Las credenciales no deben incluirse en el repositorio.

---

## DTO y protección de datos

Los DTO permiten controlar la información que se envía al cliente.

### UserDTO

Devuelve:

- ID.
- Nombre.
- Apellido.
- Email.
- Rol.

No incluye `password`.

### EventDTO

Organiza la información del evento y los datos seleccionados del organizador.

### TicketDTO

Devuelve los datos de la inscripción y la información seleccionada del evento y del usuario.

Esta separación permite mantener respuestas consistentes y evitar la exposición de información sensible.

---

## Respuestas y códigos HTTP

| Código | Significado |
|---|---|
| `200 OK` | Operación realizada correctamente |
| `201 Created` | Recurso creado correctamente |
| `400 Bad Request` | Datos inválidos o regla de negocio incumplida |
| `401 Unauthorized` | Usuario no autenticado o credenciales inválidas |
| `403 Forbidden` | Usuario autenticado sin permisos suficientes |
| `404 Not Found` | Recurso inexistente |
| `409 Conflict` | Conflicto o recurso duplicado |
| `500 Internal Server Error` | Error interno del servidor |

---

## Pruebas con Postman

Los endpoints pueden probarse mediante Postman, verificando operaciones exitosas y casos de error.

Pruebas realizadas durante la verificación del proyecto:

| Prueba | Resultado |
|---|---|
| Inicio del servidor | Correcto |
| Conexión con MongoDB | Correcta |
| Registro de usuario | Correcto |
| Asignación automática del rol `user` | Correcta |
| Login | Correcto |
| Generación de cookie de autenticación | Correcta |
| Consulta de usuario autenticado (`/current`) | Correcta |
| Consulta pública de eventos | Correcta |

También se deben verificar los siguientes escenarios:

1. Login con contraseña incorrecta.
2. Acceso a rutas protegidas sin autenticación.
3. Restricción de permisos para usuarios comunes.
4. Creación y modificación de eventos.
5. Filtros y paginación de eventos.
6. Inscripción a eventos publicados.
7. Rechazo de inscripciones duplicadas.
8. Control de cupos disponibles.
9. Consulta de tickets propios.
10. Consulta de tickets de un evento con los permisos correspondientes.
11. Cancelación de tickets.
12. Liberación de cupos al cancelar.
13. Envío de email de confirmación.
14. Cierre de sesión e invalidación de la cookie.

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

- Un usuario puede tener múltiples tickets.
- Un evento puede tener múltiples tickets.
- Cada ticket pertenece a un usuario y a un evento.
- Cada evento tiene un organizador asociado.

---

## Variables de entorno y seguridad

El proyecto utiliza variables de entorno para gestionar credenciales y configuración.

- `.env`: configuración local y credenciales.
- `.env.example`: documentación de las variables necesarias sin secretos.
- `.gitignore`: excluye `.env`, `node_modules` y otros archivos locales.

Las contraseñas se almacenan mediante bcrypt y la autenticación utiliza JWT en una cookie `HttpOnly`.

---

## Control de versiones

El proyecto utiliza Git para el control de versiones y GitHub para alojar el código fuente.

Repositorio:

https://github.com/Horvat01/Backen2-entregas

---

**Proyecto:** Plataforma de Eventos e Inscripciones  
**Alumno:** Mathias Horvat



