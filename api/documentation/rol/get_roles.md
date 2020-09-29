**GET Roles**
----
  Devuelve todos los roles del sistema

* **URL**

  /api/roles

* **Method:**

  `GET`
  
*  **Header Params**

   _No requiere_ 

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
			"descripcion": "familiar"
		},
		{
			"id_rol": 2,
			"descripcion": "profesional"
		}
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "Este usuario no posee roles" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request GET 'https://api.teayudo.tk/api/roles' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  _Sujeto a cambios futuros_
