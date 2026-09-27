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
* Consultar eventos publicados.
* Consultar información de los eventos.

No puede:

* Crear eventos.
* Modificar eventos.
* Acceder a rutas administrativas.

### Organizer

Es el rol destinado a los usuarios encargados de organizar eventos.

Puede:

* Iniciar sesión.
* Consultar eventos.
* Crear eventos.
* Modificar sus propios eventos.
* Gestionar los eventos de los cuales es organizador.

No puede:

* Modificar eventos pertenecientes a otros organizadores.
* Acceder a rutas administrativas exclusivas del administrador.

### Admin

Es el rol con mayores permisos dentro de la aplicación.

Puede:

* Iniciar sesión.
* Consultar eventos.
* Crear eventos.
* Modificar cualquier evento.
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
9. El JWT se almacena en una cookie `HttpOnly`.
10. Las rutas protegidas validan el
