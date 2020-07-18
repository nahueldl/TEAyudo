**GET Categorias**
----
  Devuelve una lista con todas las categorías y las categorias propias del usuario para cada uno de sus roles

* **URL**

  /api/categorias

* **Method:**

  `GET`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

   _No requiere_ 

* **Data Params**

   _No requiere_ 

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    [
        {
            "id_categoria": 5,
            "id_usuario_rol": 1,
            "nombre": "Personitas",
            "fecha_hora_alta": "2020-07-07T01:34:55.873Z",
            "fecha_hora_baja": null,
            "activo": true,
            "id_rol": null,
            "rol_descripcion": null
        },
        {
            "id_categoria": 7,
            "id_usuario_rol": 1,
            "nombre": "Animalitos",
            "fecha_hora_alta": "2020-07-07T01:34:55.873Z",
            "fecha_hora_baja": null,
            "activo": true,
            "id_rol": 1,
            "rol_descripcion": "Familiar"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request GET 'localhost:8080/api/categorias/' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  _Sujeto a cambios futuros_
