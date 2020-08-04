**GET Categorias**
----
  Devuelve una lista con todos los pacientes activos propios del usuario
* **URL**

  /api/pacientes

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
            "id_paciente": 1,
            "nombre": "Paciente",
            "apellido": "actualizado2",
            "fecha_hora_alta": "2020-07-15T02:23:49.880Z",
            "fecha_hora_modificacion": "2020-07-24T23:06:48.960Z",
            "fecha_hora_baja": null,
            "activo": true
        },
        {
            "id_paciente": 30,
            "nombre": "Paciente",
            "apellido": "Nuevo bb",
            "fecha_hora_alta": "2020-08-03T06:37:36.480Z",
            "fecha_hora_modificacion": null,
            "fecha_hora_baja": null,
            "activo": true
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
curl --location --request GET 'https://api.teayudo.tk/api/pacientes/' \
--header 'Authorization: Bearer 445ccb33-c017-48d4-a75b-69ef0b1eeaba'
```

* **Notes:**

  _Sujeto a cambios futuros_
