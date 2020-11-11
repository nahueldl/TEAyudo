import { logoNoSmoking } from "ionicons/icons";
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
        paciente: idPaciente,
      },
    });
  }

  editPictogram(token: string, idPictogram: string, idPaciente: string, estado?: number, nombre?: string, favorito?: boolean) {
    const header = `Bearer ${token}`;
    return this.axios.put("/api/pictogramas/" + idPictogram, 
    {
      paciente: parseInt(idPaciente),
      ...(estado ? {estado: estado} : {}),
      ...(nombre? {nombre: nombre} : {}),
      ...(favorito!=undefined ? {favorito: favorito} : {})
    },
      {headers: {Authorization: header} },
    );
  }

  createPictogram(token: string, idCategoria: number, base64img: string, nombre: string, etiqueta: string) {
    const header = `Bearer ${token}`;
    return this.axios.post("/api/pictogramas/", {
      headers: {
        Authorization: header,
      },
      params: {
        categoria: idCategoria,
        base64img: base64img,
        nombres: [{nombre: nombre}],
        etiquetas: [{etiqueta: etiqueta}],
      },
    });
  }

}

const instance = new PictogramsServices();
Object.freeze(instance);

export default instance;
