# Proyecto Final de la Unidad 7

<div style="text-align: justify">
Este proyecto usa NodeJS & Express para poder crear una API de música. Tiene la funcionalidad de crear una cuenta y loguearse. Así también permite manejar la creación de canciones y playlists. Las canciones pueden ser privadas (sólo para usuarios con cuenta creada) o públicas. Si no se está logueado sólamente puede acceder las canciones de tipo <i>público</i>. Se puede añadir una canción creada a la playlist de preferencia.
</div>


## Indicaciones
Clonar este repositorio:
```bash
git clone https://github.com/maby200/proyecto_u7.git
```
Ingresar a la carpeta clonada:
En Windows, Linux y Mac:
```bash
cd proyecto_u7
```

Instalar todas las dependencias
```bash
npm i
```

Crearemos un nuevo archivo llamado `.env` dentro de `proyecto_u7`
En Windows: 
```bash
C:\path\to\proyecto_u7> type nul > .env
```
En Linux y Mac: 
```bash
$ touch .env
```
Seguimos con el deploy de la base de datos
```bash
npx prisma migrate deploy
```
En caso de no funcionar el comando anterior, usar:
```bash
npx prisma migrate dev
```
Luego, escribir `node` para abrir la consola de node:
```bash
node
```
Aparecerá la consola de node:
```bash
Welcome to Node.js v18.13.0.
Type ".help" for more information.
> 
```

Ingresar:
```bash
Welcome to Node.js v18.13.0.
Type ".help" for more information.
> require("crypto").randomBytes(64).toString('hex')
```
Aparecerá una token, DEBES COPIARLA y luego pones `.exit`.

Ahora vamos a guardarla en un archivo.

Abre el archivo `.env` en tu editor de código de preferencia y poner:
```python
#  ...
#  Aquí se habŕan añadido varias líneas, no tocarlas
#  ...

#  Añade:

PORT=9000

TOKEN_SECRET = "pega_aqui_tu_token"

```
Ahora puedes correr el proyecto y probarlo en Postman o ThunderClient con el comando:
```bash
npm run dev
```

---

## Integrantes

- Jelsin Palomino
- José Quispe Reyes
- Maby Gavilán

