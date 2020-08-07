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
   * `apellido=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "msg": "El paciente ha sido correctamente creado"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "La informacion provista no es correcta"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/pacientes' \
--header 'Authorization: Bearer f97f0b69-5980-46a7-bb3b-7dd651133f6b' \
--header 'Content-Type: application/json' \
--data-raw '    {
        "nombre":"Paciente",
        "apellido":"Prueba"
    }
   '
```

* **Notes:**
Para crear un paciente, el usuario debe tener asignado el rol "familiar", pudiendo ser simultáneamente también un "profesional"
  _Sujeto a cambios futuros_