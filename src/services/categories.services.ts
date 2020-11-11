import { Category } from "../types/Categories";
import AxiosWrapper from "../utils/axios";

class CategoriesService {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getCategories(token: string, patientId: string):Promise<any> {
    const header = `Bearer ${token}`;
    return this.axios.get("/api/categorias", {
      headers: {
        Authorization: header,
      },
      params: {        paciente: patientId,
      },
    });
  }

  createCategory(token: string, categoryName: string, idRol: string):Promise<any> {
    const header = `Bearer ${token}`;
    return this.axios.post(
      "/api/categorias",
      {
        nombre: categoryName,
        id_rol: idRol,
      },
      { headers: { Authorization: header } }
    );
  }

  editCategory(token: string, categoryId: number, categoryName: string) {
    const header = `Bearer ${token}`;
    return this.axios.put("/api/categorias/" + categoryId, {nombre: categoryName},
      {headers: {Authorization: header,},}
    );
  }

  deleteCategory(token: string, categoryId: number) {
    const header = `Bearer ${token}`;
    return this.axios.delete("/api/categorias/" + categoryId.toString(), {
      headers: {
        Authorization: header,
      },
    });
  }
}

const instance = new CategoriesService();
Object.freeze(instance);

export default instance;
