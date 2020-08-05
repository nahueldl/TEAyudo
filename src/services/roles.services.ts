import AxiosWrapper from "../utils/axios";

class RolesService {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  handleAssignRol(idRol: number, description?: string) {
    return this.axios.post("/api/usuario/roles", {
      id_rol: idRol,
      descripcion: description,
    });
  }

  handleGetRoles(token: any) {
    const header = `Bearer ${token}`;
    return this.axios.get("/api/usuario/roles", {
      headers: {
        Authorization: header,
      },
    });
  }
}

const instance = new RolesService();
Object.freeze(instance);

export default instance;
