**PATCH Usuario**
----
  Permite editar los atributos que desee del usuario en sesión

* **URL**

  /api/usuario

* **Method:**

  `PATCH`
  
*  **URL Params**

   _No requiere parametros_ 

* **Data Params**

    **Optional:**
   * `nombre=[string]`
   * `apellido=[string]`
   * `correo=[string]`
   * `password=[string]`
   * `id_tipo_documento=[string]`
   * `nro_doc=[string]`
   * `nro_matricula=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "msg": "La información del usuario ha sido actualizada con éxito"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "No se han definido parametros"}`

  OR
  
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request PATCH 'https://api.teayudo.tk/api/usuario' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '{
    "apellido": "Cambiado1",
    "nro_doc": 12345670
}'
```

* **Notes:**

  _Sujeto a cambios futuros_