**DELETE Categoria**
----
  Elimina una categoría siempre y cuando le pertenezcan al usuario logueado

* **URL**

  /api/categorias/:id

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
    **Content:** `{ "msg" : "La categoría fue eliminada correctamente" } `
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{"msg" : "La categoría no le pertenece al usuario" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg" : "Ha ocurrido un error inesperado en el servidor" }`

* **Sample Call:**

```bash
curl --location --request DELETE 'https://api.teayudo.tk/api/categorias/382' \
--header 'Authorization: Bearer 3cf9ca9f-dd7f-4670-aaff-617691d80582'
```

* **Notes:**

  _Sujeto a cambios futuros_