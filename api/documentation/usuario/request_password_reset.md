**Request Password Reset**
----
  Envía un correo con un link/token valido por 15' para reestablecer la contraseña

* **URL**

  /api/usuario/resetPassword

* **Method:**

  `POST`
  
*  **URL Params**

   _No requiere_ 

* **Data Params**

    **Required:**
   * `correo=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "msg": "Se ha enviado el mail de restablecimiento de contraseña" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "No se encontro un usuario con ese email" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/usuario/resetPassword' \
--header 'Content-Type: application/json' \
--data-raw '{
    "correo": "correo@prueba.com"
}'
```

* **Notes:**

  _Sujeto a cambios futuros_
