import AxiosWrapper from "../utils/axios";

class ReportServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getReport(token: string, patientId: string, date?: any): Promise<any> {
    return this.axios.get("/api/informes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
      params: {
        paciente: patientId
      },
    });
  }
}
const instance = new ReportServices();
Object.freeze(instance);

export default instance;
