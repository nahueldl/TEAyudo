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

  getProfessionalAsignToUser(token: string, patientId: string): any {
    return this.axios.get("/api/pacientes/" + patientId + "/profesional", {
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
    return this.axios.post(`/api/pacientes/` + patientId + "/profesional", {
      id_profesional: professionalId,
      nro_matricula: nroMatricula,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  deleteProfessional(
    token: string,
    patientId: string,
    nroMatricula: string,
    professionalId: number
  ): Promise<any> {
    return this.axios.delete(`/api/pacientes/` + patientId + "/profesional", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id_profesional: professionalId,
        nro_matricula: nroMatricula,
      }
    });
  }
}

const instance = new ProfessionalServices();
Object.freeze(instance);

export default instance;
