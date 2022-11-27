## **Cosas por hacer**

### USUARIO:

- [ ] verificar que cuando se ingrese un usuario no exista el rut actualmente.
- [ ] verificar que el rut ingresado sea un rut (expresión regular)
- [ ] verificar que el email sea un email.
- [x] agregar el telefono al modelo. ( y cambiar controladores )
- [x] admin puede banear a un usuario ( cambiar controlador y modelo )

### POST:

- [x] cuando se ingresa un post, se aumenta el numero de post del usuario.
- [x] cuando se ingresa un post, se verifica que exista el usuario.
- [x] cuando se elimina un post, se reduce el numero de post del usuario.
- [x] se verifica el numero actual de post del usuario, antes de enviar el post a db.
- [x] añadir la funcion de poner imagenes.
- [ ] enviar correos cada vez que un post en reportado (hacer solamente la parte del envio del correo, el reporte es frontend)
- [ ] tambien se envia correo al usuario, cuando su post ha sido reiteradamente reportado (3+)
- [ ] el usuario que postea elige el tiempo de vida (min 3 dias maximo 7)
- [x] revisar si hay titulos repetidos.
- [x] verificar que el usuario no tenga ban.
- [x] publicaciones con más de 3 reportes no aparecen en la lista comun ( modificar controlador -> sort )

### COMENTARIOS:

- [ ] verificar que cuando se ingresa un comentario, el post exista.
- [ ] verificar que cuando se ingresa el comentario, el usuario que ingresa exista. (esto es parte de frontend, pero igual que puede hacer en el backend)
