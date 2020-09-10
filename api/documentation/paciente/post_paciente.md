**POST Paciente**
----
  Crea un nuevo paciente y lo asocia al usuario logueado

* **URL**

  /api/pacientes

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

    **Optional:**
   * `nombre=[string]`
   * `apellido=[string]`
   * `fase=[int]`
   * `base64img=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    ```json
      {
          "id_paciente": 1,
          "nombre": "Jose",
          "apellido": "Perez",
          "fase": 1,
          "avatar": "https://res.cloudinary.com/teayudo/image/upload/v1599772040/if8nzhh0l6lcurcveqta.png",
          "fecha_hora_alta": "2020-09-10T21:07:36.993Z",
          "fecha_hora_modificacion": null,
          "fecha_hora_baja": null,
          "activo": true
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "La informacion provista no es correcta"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/pacientes' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '    {
        "nombre":"Jose",
        "apellido":"Perez",
        "fase":1,
        "base64img":"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"
    }
'
```

* **Notes:**
Para crear un paciente, el usuario debe tener asignado el rol "familiar", pudiendo ser simultáneamente también un "profesional".
  _Sujeto a cambios futuros_