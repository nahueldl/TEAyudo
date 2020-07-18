import AxiosWrapper from "../utils/axios";
import { TEAyudoContext } from "../context";

class AuthenticationServices {
  private axios: AxiosWrapper;

  static contextType = TEAyudoContext;
  context!: React.ContextType<typeof TEAyudoContext>;

  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  handleLogIn(email: string, password: string) {
    this.context.setData({ loading: true, error: false });
    return this.axios
      .post("/api/usuario/login", { correo: email, password: password })
      .then((res: any) => {
        this.context.setData({
          username: email,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error: any) => {
        this.context.setData({
          loading: false,
          error: true,
        });
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
    this.context.setData({ loading: true, error: false });

    return this.axios
      .post("/api/usuario/register", {
        nombre: name,
        apellido: "",
        correo: email,
        password: password,
      })
      .then((res: any) => {
        this.context.setData({ loading: false });
      })
      .catch((error: any) => this.context.setData({ error: true }));
  }
}

const instance = new AuthenticationServices();
Object.freeze(instance);

export default instance;
