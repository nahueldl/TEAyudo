**Register**
----
  Devuelve un 200 OK confirmando la asignacion del nuevo rol

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

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "Ha ocurrido un error al tratar de asignar el rol"}`

* **Sample Call:**

```bash
curl --location --request POST 'localhost:8080/api/usuario/roles' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id_rol": 1,
    "descripcion": "Familiar"
}'
```

* **Notes:**

  Queda pendiente crear nuevos tipos de error en caso que falten datos en la petición