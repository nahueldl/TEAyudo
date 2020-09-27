import AxiosWrapper from "../utils/axios";

class PatientServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getPatientsFromUser(token: string): any {
    return this.axios.get("/api/pacientes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  postNewPatient(
    token: string,
    name: string,
    lastName: string,
    // birthday: string,
    avatar: string
  ) {
    return this.axios.post(
      "/api/pacientes",
      {
        nombre: name,
        apellido: lastName,
        fase: 1,
        // fechaNac: birthday,
        // base64img: avatar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  putEditPatient(
    token: string,
    id: any,
    name: string,
    lastName: string,
    avatar: string
  ) {
    return this.axios.put(
      "/api/pacientes/" + id,
      {
        nombre: name,
        apellido: lastName,
        fase: 1,
        // base64img: avatar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deletePatient(token: string, id: any) {
    return this.axios.delete("/api/pacientes/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
const instance = new PatientServices();
Object.freeze(instance);

export default instance;
