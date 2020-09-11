**PUT Paciente**
----
  Actualiza un paciente que fué previamente creado y asociado

* **URL**

  /api/pacientes/:id

* **Method:**

  `PUT`
  
*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `id=[int]`

* **Data Params**

    **Required:**
   * `nombre=[string]`
   * `apellido=[string]`
   * `fase=[int]`

    **Optional:**
   * `base64img=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{"msg": "Se ha actualizado el paciente con id=1"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "La informacion provista no es correcta"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request PUT 'https://api.teayudo.tk/api/pacientes/1' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '    {
        "nombre":"josesito",
        "apellido":"Perez",
        "fase":2
    }
'
```

* **Notes:**
Para crear un paciente, el usuario debe tener asignado el rol "familiar", pudiendo ser simultáneamente también un "profesional".
  _Sujeto a cambios futuros_