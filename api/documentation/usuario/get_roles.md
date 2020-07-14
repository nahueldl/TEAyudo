**GET Roles**
----
  Devuelve los roles que el usuario que se encuentra logueado tiene asignados

* **URL**

  /api/usuario/roles

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
            "id_rol": 1,
            "descripcion": "Familiar"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "Este usuario no posee roles" }`

* **Sample Call:**

```bash
curl --location --request GET 'localhost:8080/api/usuario/roles' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  _Queda pendiente crear nuevos tipos de error en caso que falten datos en la petición_
