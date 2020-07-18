import AxiosWrapper from "../utils/axios";

class AuthenticationServices {
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
    email: string,
    password: string,
    idDoc?: string,
    docNumber?: string,
    licenseNumber?: string
  ) {
    // TODO 
    return this.axios.post("/api/usuario/register", {
      nombre: name,
      apellido: "",
      correo: email,
      password: password,
    });
  }
}

const instance = new AuthenticationServices();
Object.freeze(instance);

export default instance;
