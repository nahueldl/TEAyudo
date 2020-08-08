import AxiosWrapper from "../utils/axios";

class PatientServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  getPatientsFromUser(email: string) {
    return this.axios.get("/api/usuario/pacientes", {
      params: {
        correo: email,
      },
    });
  }

  postNewPatient(
    name: string,
    lastName: string,
    birthday: string,
    fase: string
  ) {
    return this.axios.put("/api/usuario/paciente", {
      nombre: name,
      apellido: lastName,
      fechaNac: birthday,
      fase: fase,
    });
  }

  putEditPatient(
    name: string,
    lastName: string,
    birthday: string,
    fase: string
  ) {
    return this.axios.put("/api/usuario/paciente", {
      nombre: name,
      apellido: lastName,
      fechaNac: birthday,
      fase: fase,
    });
  }

  deletePatient(name: string) {
    return this.axios.delete("/api/usuario/paciente", {
      params: {
        nombre: name,
      },
    });
  }
}
const instance = new PatientServices();
Object.freeze(instance);

export default instance;
