**GET Informe**
----
  Permite devolver el informe de los pasados 30 días partiendo del instante de la petición, o partiendo de una fecha en particular

* **URL**

  /api/informe?paciente=:id&fecha=date

* **Method:**

  `GET`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `id=[int]`

    **Optional:**
   * `date=[ISOdate]`

* **Data Params**

   _No requiere_ 

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `PDF file`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ "msg": "El usuario no tiene los permisos" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "msg": "No se encontro un paciente con ese id asociado al usuario logueado" }`

  OR
  

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request GET 'https://api.teayudo.tk/api/informes?paciente=1&fecha=2020-10-21T00:00:00' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**
  Recordar que la fecha tiene que ir en formato ISO como muestra el ejemplo.
  _Sujeto a cambios futuros_
