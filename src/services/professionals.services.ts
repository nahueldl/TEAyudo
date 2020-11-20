import AxiosWrapper from "../utils/axios";

class ProfessionalServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getProfessionals(token: string): any {
    return this.axios.get("/api/profesionales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  postAsignProfessional(
    token: string,
    patientId: string,
    nroMatricula: string,
    professionalId: number
  ): Promise<any> {
    return this.axios.post(`/api/pacientes/` + patientId + "/asignarProfesional", {
      id_profesional: professionalId,
      nro_matricula: nroMatricula,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
}

const instance = new ProfessionalServices();
Object.freeze(instance);

export default instance;
