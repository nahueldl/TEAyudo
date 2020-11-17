import AxiosWrapper from "../utils/axios";

class ReportServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getReport(
    token: string,
    patientId?: string,
    // date?: string,
  ): Promise<any> {
    return this.axios.get(`/api/informe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...(patientId ? { paciente: patientId } : {}),
        // ...(date ? { date: date } : {})
      },
    });
  }
}
const instance = new ReportServices();
Object.freeze(instance);

export default instance;
