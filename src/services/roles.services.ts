import { Rol } from "../types/Roles";
import AxiosWrapper from "../utils/axios";

class RolesService {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  assignRol(
    token: string | undefined,
    idRol: number,
    description?: string
  ) {
    const header = `Bearer ${token}`;
    return this.axios.post(
      "/api/usuario/roles",
      {
        id_rol: idRol,
        descripcion: description,
      },
      {
        headers: {
          Authorization: header,
        },
      }
    );
  }

  getPatientRoles(token: string): Promise<Rol[]> {
    const header = `Bearer ${token}`;
    return this.axios.get("/api/usuario/roles", {
      headers: {
        Authorization: header,
      },
    });
  }

  getAllRoles(): Promise<Rol[]> {
    return this.axios.get("/api/roles");
  }
}

const instance = new RolesService();
Object.freeze(instance);

export default instance;
