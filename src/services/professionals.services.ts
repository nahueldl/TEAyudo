import AxiosWrapper from "../utils/axios";

class ProfessionalServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getProfessionalsFromUser(token: string): any {
    return this.axios.get("/api/profesionales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
const instance = new ProfessionalServices();
Object.freeze(instance);

export default instance;
