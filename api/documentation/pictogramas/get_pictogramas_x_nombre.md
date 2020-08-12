**GET Pictogramas por nombre**
----
  Devuelve una lista con todos los pictogramas cuyo nombre encaja parcialmente con el suministrado, puede buscar dentro de los nombres personalizados para un paciente

* **URL**

  /api/pictogramas?nombre=:nombre&paciente=:idPaciente

* **Method:**

  `GET`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `nombre=[string]`

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
          "id_pictograma": 1,
          "ruta_acceso_local": "https://api.arasaac.org/api/pictograms/36864",
          "esquematico": true,
          "sexo": false,
          "violencia": false,
          "fecha_hora_alta": "2020-07-23T06:23:26.800Z",
          "fecha_hora_modificacion": null,
          "fecha_hora_baja": null,
          "estado": 1,
          "nombre_personalizado": "NombrePersonalizado1",
          "favorito": false,
          "nombres": [
              {
                  "id_nombre_pictograma": 1,
                  "nombre": "persona con pantalla",
                  "tiene_locucion": false,
                  "tipo": 2,
                  "nombre_plural": "personas con pantalla"
              },
              {
                  "id_nombre_pictograma": 2,
                  "nombre": "llevar pantalla",
                  "tiene_locucion": false,
                  "tipo": 3
              }
          ],
          "etiquetas": null
      }
    ]
    ```
 
* **Error Response:**

    * **Code:** 400 USER ERROR <br />
    **Content:** `No se puede realizar una busqueda para menos de 3 caracteres`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request GET 'https://api.teayudo.tk/api/pictogramas?nombre=NombrePersonalizado1&paciente=1' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  El estado del pictograma puede ser 1 ó 0 para denotar si este paciente lo eliminado o no. _Sujeto a cambios futuros_
