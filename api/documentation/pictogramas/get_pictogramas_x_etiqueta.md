**GET Pictogramas por nombre**
----
  Devuelve una lista con todos los pictogramas cuya etiqueta encaja parcialmente con la suministrada

* **URL**

  /api/pictogramas?etiqueta=:etiqueta

* **Method:**

  `GET`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `etiqueta=[string]`

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
					"id_etiqueta": 1,
					"nombre": "object",
					"fecha_hora_alta": "2020-07-23T03:23:26.810"
				},
				{
					"id_etiqueta": 2,
					"nombre": "fashion",
					"fecha_hora_alta": "2020-07-23T03:23:26.813"
				},
				{
					"id_etiqueta": 3,
					"nombre": "clothes",
					"fecha_hora_alta": "2020-07-23T03:23:26.813"
				},
				{
					"id_etiqueta": 4,
					"nombre": "workwear",
					"fecha_hora_alta": "2020-07-23T03:23:26.813"
				},
				{
					"id_etiqueta": 5,
					"nombre": "protective equipment",
					"fecha_hora_alta": "2020-07-23T03:23:26.813"
				}
			]
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
curl --location --request GET 'https://api.teayudo.tk/api/pictogramas?etiqueta=object' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  _Sujeto a cambios futuros_
