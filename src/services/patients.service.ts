import AxiosWrapper from "../utils/axios";

class PatientServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getPatientsFromUser(token: string): any {
    const header = `Bearer ${token}`;
    return this.axios.get("/api/pacientes", {
      headers: {
        Authorization: header,
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
    const header = `Bearer ${token}`;
    debugger;
    return this.axios.put("/api/pacientes", {
      nombre: name,
      apellido: lastName,
      // fechaNac: birthday,
      base64img: avatar,
      headers: {
        Authorization: header,
      },
    });
  }

  putEditPatient(
    name: string,
    lastName: string,
    birthday: string,
    avatar: string
  ) {
    return this.axios.put("/api/paciente", {
      nombre: name,
      apellido: lastName,
      fechaNac: birthday,
      base64img: avatar,
    });
  }

  deletePatient(name: string) {
    return this.axios.delete("/api/paciente", {
      params: {
        nombre: name,
      },
    });
  }
}
const instance = new PatientServices();
Object.freeze(instance);

export default instance;
