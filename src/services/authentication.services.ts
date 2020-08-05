import AxiosWrapper from "../utils/axios";

class AuthenticationService {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  handleLogIn(email: string, password: string) {
    return this.axios.post("/api/usuario/login", {
      correo: email,
      password: password,
    });
  }

  handleSignUp(
    name: string,
    lastname: string,
    email: string,
    password: string,
    idDoc?: string,
    docNumber?: string,
    licenseNumber?: string
  ) {
    return this.axios.post("/api/usuario/register", {
      nombre: name,
      apellido: lastname,
      correo: email,
      password: password,
      id_tipo_documento: idDoc,
      nro_doc: docNumber,
      nro_matricula: licenseNumber,
    });
  }
}

const instance = new AuthenticationService();
Object.freeze(instance);

export default instance;
