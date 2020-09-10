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
          "nombre": "Jose",
          "apellido": "Perez",
          "fase": 1,
          "avatar": null,
          "fecha_hora_alta": "2020-09-04T19:05:31.470Z",
          "fecha_hora_modificacion": "2020-09-10T21:37:50.573Z",
          "fecha_hora_baja": null,
          "activo": true
      },
      {
          "id_paciente": 2,
          "nombre": "Jose2",
          "apellido": "Perez",
          "fase": 2,
          "avatar": "https://res.cloudinary.com/teayudo/image/upload/v1599772040/if8nzhh0l6lcurcveqta.png",
          "fecha_hora_alta": "2020-09-10T21:07:36.993Z",
          "fecha_hora_modificacion": "2020-09-10T21:42:03.050Z",
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
