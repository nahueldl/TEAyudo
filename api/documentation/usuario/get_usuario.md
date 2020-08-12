**GET Usuario**
----
  Permite obtener los atributos del usuario en sesión

* **URL**

  /api/usuario

* **Method:**

  `GET`
  
*  **URL Params**

   _No requiere parametros_ 

* **Data Params**

   _No requiere parametros_ 

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "id_usuario": 1,
      "id_tipo_documento": 1,
      "nombre": "Juan",
      "apellido": "Perez",
      "correo": "correo@prueba.com",
      "nro_doc": "12345678",
      "nro_matricula": null,
      "fecha_hora_alta": "2000-01-01T23:59:59.999Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request GET 'https://api.teayudo.tk/api/usuario' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  _Sujeto a cambios futuros_