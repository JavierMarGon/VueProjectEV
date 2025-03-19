# Funcionalidades

## Autenticación y gestión de usuarios:

postLogin(user, pass): Envía credenciales a /login, almacena el token en sessionStorage si la autenticación es exitosa.

postRegister(...): Envía datos de registro a /register, sin almacenar datos localmente.

patchUserData(...): Actualiza la información del usuario en /currentUser, usando el token de sesión.

getProfile(): Obtiene datos del usuario desde /profile, almacena información en sessionStorage y maneja tokens expirados.

## Gestión de centros y fechas:

getCenters(): Obtiene centros desde /centers y los guarda en sessionStorage.

postDateCreate(centerName, date): Crea una cita en /date/create.

postDateDelete(centerName, date): Elimina una cita en /date/delete.

getDates(): Recupera las citas del usuario desde /date/getByUser y las almacena en sessionStorage.

getDatesByDay(date, center): Obtiene citas de un día específico en /date/getByDay y filtra por centro.

## Uso de sessionStorage:

Se usa para almacenar el token de autenticación, datos del usuario, centros y fechas.

Se limpia en caso de token expirado y redirige a /login.

# VueProjectEV

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
