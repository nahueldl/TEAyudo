**POST Categoria**
----
  Crea una nueva categoría y la asocia al usuario logueado y al rol especificado

* **URL**

  /api/categorias

* **Method:**

  `POST`
  
*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

   _No requiere parametros_ 

* **Data Params**

    **Required:**
   * `nombre=[string]`
   * `id_rol=[int]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "id_categoria": 385,
      "id_usuario_rol": 2,
      "nombre": "CategoriaEjemplo",
      "fecha_hora_alta": "2020-08-18T01:29:43.970Z",
      "fecha_hora_baja": null,
      "activo": true
  }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "La informacion provista no es correcta"}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/categorias/' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre":"CategoriaEjemplo8",
    "id_rol": 1
}'
```

* **Notes:**

  _Sujeto a cambios futuros_