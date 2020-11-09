import { Category } from "../types/Categories";
import AxiosWrapper from "../utils/axios";

class CategoriesService {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getCategories(token: string, patientId: string):Promise<Category[]> {
    const header = `Bearer ${token}`;

    return this.axios.get("/api/categorias", {
      headers: {
        Authorization: header,
      },
      params: {
        paciente: patientId,
      },
    });
  }

  createCategory(token: string, categoryName: string, idRol: string):Promise<Category> {
    const header = `Bearer ${token}`;
    return this.axios.post("/api/categorias", {
      headers: {
        Authorization: header,
      },
      params: {
        nombre: categoryName,
        id_rol: idRol,
      },
    });
  }

  editCategory(token: string, categoryName: string) {
    const header = `Bearer ${token}`;
    return this.axios.put("/api/categorias", {
      headers: {
        Authorization: header,
      },
      params: {
        nombre: categoryName,
      },
    });
  }

  deleteCategory(token: string, categoryId: string) {
    const header = `Bearer ${token}`;
    return this.axios.delete("/api/categorias", {
      headers: {
        Authorization: header,
      },
      params: {
        id: categoryId,
      },
    });
  }
}

const instance = new CategoriesService();
Object.freeze(instance);

export default instance;
