import AxiosWrapper from "../utils/axios";

class CategoriaServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getCategoriesFromUser(token: string, idPaciente: any) {
    return this.axios.get("/api/categorias?paciente=:" + idPaciente, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  postNewCategory(
    token: string,
    name: string,
    idRol: any
  ) {
    return this.axios.post(
      "/api/categorias",
      {
        data: {
          nombre: name,
          id_rol: idRol,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
  }

  putEditCategory(
    token: string,
    idCategoria: any,
    name: string
  ) {
    return this.axios.put(
      "/api/categorias/:" + idCategoria,
      {
        nombre: name
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
  }

  deleteCategory(token: string, idCategoria: any) {
    return this.axios.delete("/api/categorias/:" + idCategoria, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
const instance = new CategoriaServices();
Object.freeze(instance);

export default instance;
