**POST Pictograma**
----
  Permite cargar un nuevo pictograma a una categoría propia

* **URL**

  /api/pictogramas

* **Method:**

  `POST`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

   _No requiere_ 

* **Data Params**

    **Required:**
   * `categoria=[int]`
   * `base64img=[string]`
   * ```
		nombres=[
			{
				nombre:[string]
			}
		]
  	 ```
	* ```
		etiquetas=[
			{
				nombre:[string]
			}
		]
  	 ```

    **Optional:**
   * `esquematico=[bool]`
   * `sexo=[bool]`
   * `violencia=[bool]`
   * ```
		nombres=[
			{
				nombre_plural:[string],
				descripcion:[string],
				tiene_locucion:[bit],
				tipo:[int],
			}
		]
  	 ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
	```json
	{
		"id_pictograma": 10965,
		"ruta_acceso_local": "https://res.cloudinary.com/teayudo/image/upload/v1597710586/ongawzhyou8sch1nxlpr.png",
		"esquematico": null,
		"sexo": null,
		"violencia": null,
		"fecha_hora_alta": "2020-08-18T00:29:47.000Z",
		"fecha_hora_modificacion": null,
		"fecha_hora_baja": null,
		"nombres": [
			{
				"id_nombre_pictograma": 14885,
				"nombre": "nombre de prueba"
			}
		],
		"etiquetas": [
			{
				"id_etiqueta": 1,
				"nombre": "object",
				"fecha_hora_alta": "2020-07-23T03:23:26.810"
			}
		]
	}
	```

 
* **Error Response:**

    * **Code:** 400 USER ERROR <br />
    **Content:** `{"msg": "Faltan definir parametros"}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{"msg": "La categoría no le pertenece al usuario"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/pictogramas/' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '{
    "categoria": 382,
    "nombres": [
        {
            "nombre":"nombre de prueba"
        }
    ],
    "etiquetas": [
        {
            "nombre": "object"
        }
    ],
    "base64img": "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
}'
```

* **Notes:**

  La imagen debe ser PNG y debe ser pasada en formato Base64.
  `nombres` aparece tanto en la sección de **Required** como en la de **Optional**, ya que algunos valores son opcionales pero otros son obligatorios.
  _Sujeto a cambios futuros_
