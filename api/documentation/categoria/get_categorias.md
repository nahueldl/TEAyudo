**GET Categorias**
----
  Devuelve una lista con todas las categorías para un paciente (inlusive las creadas por su profesional asociado); Y si idPaciente es null devuelve solo las categorias creadas por el usuario logueado

* **URL**

  /api/categorias?paciente=:idPaciente

* **Method:**

  `GET`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Optional:**
   * `idPaciente=[string]`

* **Data Params**

   _No requiere_ 

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    [
      {
          "id_categoria": 1,
          "id_usuario_rol": null,
          "nombre": "protective equipment",
          "fecha_hora_alta": "2020-07-23T06:23:26.810Z"
      },
      {
          "id_categoria": 2,
          "id_usuario_rol": null,
          "nombre": "medical equipment",
          "fecha_hora_alta": "2020-07-23T06:23:26.817Z"
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
curl --location --request GET 'https://api.teayudo.tk/api/categorias/' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  _Sujeto a cambios futuros_
