**Asignar Rol**
----
  Devuelve un mensaje confirmando la asignacion del nuevo rol

* **URL**

  /api/usuario/roles

* **Method:**

  `POST`
  
*  **URL Params**

   _No requiere parametros_ 

* **Data Params**

    **Required:**
   * `id_rol=[int]`

    **Optional:**
   * `descripcion=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "msg": "El rol ha sido asignado con exito"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "Ha ocurrido un error al tratar de asignar el rol"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/usuario/roles' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id_rol": 1,
    "descripcion": "Familiar"
}'
```

* **Notes:**

  _Sujeto a cambios futuros_
