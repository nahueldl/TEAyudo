**POST Resultado**
----
  Guarda el resultado de la jugada creada previamente

* **URL**

  /api/pacientes/:idPaciente/jugada/:idJugada/resultado

* **Method:**

  `POST`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `idPaciente=[int]`
   * `idJugada=[int]`

* **Data Params**

    **Required:**
   * `resultado=[bit]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "msg": "El resultado ha sido almacenado" }`

 
* **Error Response:**

    * **Code:** 400 USER ERROR <br />
    **Content:** `{ "msg": "Faltan definir parametros" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/pacientes/1/jugada/6/resultado' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '{
    "resultado": 1
}'
```

* **Notes:**

  _Sujeto a cambios futuros_
