**Register**
----
  Devuelve un mensaje confirmando la creación del nuevo usuario

* **URL**

  /api/usuario/register

* **Method:**

  `POST`
  
*  **URL Params**

   _No requiere parametros_ 

* **Data Params**

    **Required:**
   * `nombre=[string]`
   * `apellido=[string]`
   * `correo=[string]`
   * `password=[string]`

    **Optional:**
   * `id_tipo_documento=[string]`
   * `nro_doc=[string]`
   * `nro_matricula=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "msg": "El usuario ha sido correctamente creada"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request POST 'https://api.teayudo.tk/api/usuario/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id_tipo_doc": 1,
    "nombre": "Juan",
    "apellido": "Perez",
    "correo": "correo@prueba.com",
    "password": "passgenerica",
    "nro_doc": "12345678"
}'
```

* **Notes:**

  _Sujeto a cambios futuros_