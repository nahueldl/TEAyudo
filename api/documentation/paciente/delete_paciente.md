**PUT Pictograma**
----
  Permite realizar la baja lógica de un paciente asociado al usuario

* **URL**

  /api/pacientes/:id

* **Method:**

  `DELETE`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `id=[int]`

* **Data Params**

   _No requiere_ 

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `Se ha dado de baja el paciente`
    ```
 
* **Error Response:**

    * **Code:** 404 USER ERROR <br />
    **Content:** `No se encontro paciente`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request DELETE 'https://api.teayudo.tk/api/pacientes/1' \
--header 'Authorization: Bearer f97f0b69-5980-46a7-bb3b-7dd651133f6b'
```

* **Notes:**

 _Sujeto a cambios futuros_
