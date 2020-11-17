import { Pictogram, PictogramName, PictogramTag } from "../types/Pictograms";
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
  ): Promise<any> {
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

  getPictogramsByTag(token: string, tag: string): Promise<any> {
    return this.axios.get(`/api/pictogramas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        etiqueta: tag,
      },
    });
  }

  getPictogramsByName(
    token: string,
    name: string,
    patientId?: string
  ): Promise<Pictogram> {
    return this.axios.get(`/api/pictogramas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        nombre: name,
        paciente: patientId,
      },
    });
  }

  loadPictogramToCategory(
    token: string,
    category: number,
    base64img: string,
    names: PictogramName,
    tags: PictogramTag,
    eschematic?: boolean,
    sex?: boolean,
    violence?: boolean
  ): Promise<any> {
    return this.axios.post(`/api/pictogramas`, {
        categoria: category,
        base64img,
        nombres: names,
        etiquetas: tags,
        ...(eschematic ? { esquematico: true } : {}),
        ...(sex ? { sexo: true } : {}),
        ...(violence ? { violencia: true } : {}),
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  editPictogram(
    token: string,
    pictogramId: number,
    patientId: number,
    state?: number,
    name?: string,
    favorite?: boolean
  ) {
    return this.axios.put(`/api/pictogramas/${pictogramId}`, {
      headers: {
        Authorization: `Bearer ${token},`,
      },
      params: {
        paciente: patientId,
        ...(state ? { estado: state } : {}),
        ...(name ? { nombre: name } : {}),
        ...(favorite ? { favorito: favorite } : {}),
      },
    });
  }
}

const instance = new PictogramsServices();
Object.freeze(instance);

export default instance;
