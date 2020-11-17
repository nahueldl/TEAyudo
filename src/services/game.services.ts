import AxiosWrapper from "../utils/axios";

class GameServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getMove(token: string, patientId: string): Promise<any> {
    const header = `Bearer ${token}`;
    return this.axios.get(`/api/pacientes/${patientId}/jugada`, {
      headers: {
        Authorization: header,
      },
    });
  }

  postResult(
    token: string,
    patientId: string,
    moveId: number,
    outcome: number
  ) {
    const header = `Bearer ${token}`;
    return this.axios.post(`/api/${patientId}/jugada/${moveId}/resultado`, {
      headers: {
        Authorization: header,
      },
      params: {
        resultado: outcome,
      },
    });
  }
}

const instance = new GameServices();
Object.freeze(instance);

export default instance;
