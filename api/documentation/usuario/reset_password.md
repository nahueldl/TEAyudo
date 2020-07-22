**Reset Password**
----
  Utilizando el token obtenido por mail permite cambiar la contraseña por una nueva

* **URL**

  /api/usuario/resetPassword/:token

* **Method:**

  `POST`
  
*  **URL Params**

    **Required:**
   * `token=[string]` 

* **Data Params**

    **Required:**
   * `correo=[string]`
   * `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "msg": "Se ha reestablecido correctamente la contraseña" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "No se encontro un usuario con ese email" }`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "El token no es valido" }`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "El token ya no es valido, genere uno nuevo" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/usuario/resetPassword/2yuAcaUPRiWFKuhe0AHgLzA4Vnl5FUR0uCW42DpQeAFzb9l3stTNVM8VsCBRUVvm' \
--header 'Content-Type: application/json' \
--data-raw '{
    "correo": "correo@prueba.com",
    "password": "passgenerica"
}'
```

* **Notes:**

  _Sujeto a cambios futuros_
