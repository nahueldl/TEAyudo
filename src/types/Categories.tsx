export type Category = {
    id_categoria: number;
    id_usuario_rol: string;
    nombre: string;
    fecha_hora_alta?: string;
    fecha_hora_baja?: string;
    activo?: boolean;
}