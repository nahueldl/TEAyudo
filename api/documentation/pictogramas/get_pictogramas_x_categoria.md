**GET Pictogramas por categoria**
----
  Devuelve una lista con todos los pictogramas para una categoría determinada, pueden incluir las personalizaciones de un paciente

* **URL**

  /api/categorias/:idCategoria/pictogramas?paciente=:idPaciente

* **Method:**

  `GET`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `idCategoria=[int]`


    **Optional:**
   * `idPaciente=[int]`

* **Data Params**

   _No requiere_ 

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    [
      {
          "id_pictograma": 5,
          "ruta_acceso_local": "https://api.arasaac.org/api/pictograms/36863",
          "esquematico": true,
          "sexo": false,
          "violencia": false,
          "fecha_hora_alta": "2020-07-23T06:23:26.810Z",
          "fecha_hora_modificacion": null,
          "fecha_hora_baja": null,
          "estado": null,
          "nombre_personalizado": null,
          "favorito": null,
          "nombres": [
            {
                "id_nombre_pictograma": 9,
                "nombre": "mampara",
                "tiene_locucion": false,
                "tipo": 2,
                "nombre_plural": "mamparas"
            },
            {
                "id_nombre_pictograma": 10,
                "nombre": "mampara protectora",
                "tiene_locucion": false,
                "tipo": 2,
                "nombre_plural": "mamparas protectoras"
            }
          ],
          "etiquetas": [
            {
                "nombre": "object",
                "fecha_hora_alta": "2020-07-23T03:23:26.810"
            },
            {
                "nombre": "fashion",
                "fecha_hora_alta": "2020-07-23T03:23:26.813"
            }
          ]
      }
    ]
    ```
 
* **Error Response:**

    * **Code:** 400 USER ERROR <br />
    **Content:** `No existe la categoría`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request GET 'https://api.teayudo.tk/api/categorias/1/pictogramas?paciente=1' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  El estado del pictograma puede ser 1 ó 0 para denotar si este paciente lo eliminado o no. _Sujeto a cambios futuros_
