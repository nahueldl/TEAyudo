import AxiosWrapper from "../utils/axios";

class TranslateServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

postTranslate(token:string, patientId: string, pictograms: any[]): Promise<any> {
    return this.axios.post("/api/traducciones?paciente=" + patientId, {
        pictogramas: pictograms
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
  }
} 

const instance = new TranslateServices();
Object.freeze(instance);

export default instance;