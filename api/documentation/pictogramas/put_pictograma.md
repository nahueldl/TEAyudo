**PUT Pictograma**
----
  Permite personalizar un pictograma, marcándolo como favorito, cambiandole el nombre y/o eliminandolo

* **URL**

  /api/pictogramas/:id

* **Method:**

  `PUT`

*  **Header Params**

    **Required:**
   * `Authorization: Bearer [token]`

*  **URL Params**

    **Required:**
   * `id=[int]`

* **Data Params**

    **Required:**
   * `paciente=[int]`

    **Optional:**
   * `estado=[int]`
   * `nombre=[string]`
   * `favorito=[bool]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `El pictograma ha sido modificado con exitos`
    ```
 
* **Error Response:**

    * **Code:** 400 USER ERROR <br />
    **Content:** `Parametros necesarios no han sido definidos`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request PUT 'https://api.teayudo.tk/api/pictogramas/1' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582' \
--header 'Content-Type: application/json' \
--data-raw '{
    "paciente": 1,
    "nombre": "NombrePersonalizado1"
}'
```

* **Notes:**

  Se debe cambiar al menos un valor. "favorito" debe tomar el valor 1 ó 0. "estado" usa 1 como valor para activo y 0 para eliminado. _Sujeto a cambios futuros_
