**Log In**
----
  Devuelve un token que por 1 hora permite el acceso a los recursos protegidos

* **URL**

  /api/usuario/login

* **Method:**
  
  <_The request type_>

  `POST`
  
*  **URL Params**

   _No requiere parametros_ 

   **Required:**
 
   `id=[integer]`

   **Optional:**
 
   `photo_id=[alphanumeric]`

* **Data Params**

    **Required:**
   * `correo=[string]`
   * `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "token": "3cf9ca9f-dd7f-4670-aaff-617691d80582" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "No se encontro un usuario con ese email" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "La contraseña no es correcta" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://teayudotestingwebapp.azurewebsites.net/api/usuario/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "correo": "correo@prueba.com",
    "password": "passgenerica"
}'
```

* **Notes:**

  Queda pendiente crear nuevos tipos de error en caso que falten datos en la petición
