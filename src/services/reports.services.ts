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
      params: {
        paciente: patientId,
        // ...(date ? { fecha: date } : {}),
      },
    });
  }
}
const instance = new ReportServices();
Object.freeze(instance);

export default instance;
