import AxiosWrapper from "../utils/axios";

class PictogramsServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getPictogramsByCategory(
    token: string,
    categoryId: number,
    pictogramId?: string,
    offset?: number,
    limit?: number
  ): any {
    return this.axios.get(`/api/categorias/${categoryId}/pictogramas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...(pictogramId ? { paciente: pictogramId } : {}),
        ...(offset ? { offset: offset } : {}),
        ...(limit ? { limit: limit } : {}),
      },
    });
  }

  getPictogramsByTag(token: string, tag: string): any {
    return this.axios.get(`/api/pictogramas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        etiqueta: tag,
      },
    });
  }

  getPictogramsByName(token: string, name: string, idPaciente?: string): any {
    return this.axios.get(`/api/pictogramas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        nombre: name,
        idPaciente: idPaciente,
      },
    });
  }

  getPictogramsFromUser(token: string){
    console.log(token)
  }
}

const instance = new PictogramsServices();
Object.freeze(instance);

export default instance;
