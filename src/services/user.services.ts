import AxiosWrapper from "../utils/axios";

class UserServices {
  private axios: AxiosWrapper;
  constructor() {
    this.axios = new AxiosWrapper({ useErrorInterceptor: true });
  }

  patchUsuario(
    token: string,
    nombre?: string,
    apellido?: string,
    correo?: string,
    password?: string,
    id_tipo_documento?: string,
    nro_doc?: string,
    nro_matricula?: string
  ) {
    const header = `Bearer ${token}`;
    return this.axios.patch("/api/usuario", {
      headers: {
        Authorization: header,
      },
      data: {
        ...(nombre ? { nombre: nombre } : {}),
        ...(apellido ? { apellido: apellido } : {}),
        ...(correo ? { correo: correo } : {}),
        ...(password ? { password: password } : {}),
        ...(id_tipo_documento ? { id_tipo_documento: id_tipo_documento } : {}),
        ...(nro_doc ? { nro_doc: nro_doc } : {}),
        ...(nro_matricula ? { nro_matricula: nro_matricula } : {}),
      },
    });
  }
}
const instance = new UserServices();
Object.freeze(instance);

export default instance;
