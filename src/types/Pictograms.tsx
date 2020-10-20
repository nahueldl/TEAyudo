export type Pictogram = {
  id_pictograma: number;
  ruta_acceso_local: string;
  esquematico: boolean;
  sexo: boolean;
  violencia: boolean;
  fecha_hora_alta: string;
  fecha_hora_modificacion: string;
  fecha_hora_baja: string;
  estado: number;
  nombre_personalizado: string;
  favorito: boolean;
  nombres: PictogramName[];
  etiquetas: PictogramTag[];
};

export type PictogramName = {
    id_nombre_pictograma: number;
    nombre: string;
    tiene_locucion: boolean;
    tipo: number;
    nombre_plural: string;
}

export type PictogramTag = {
    nombre: string;
    fecha_hora_alta: string;
}
