import { Pictogram } from "./Pictograms";

export type Move = {
  id_jugada: number;
  nombres_posibles: GameOption[];
  pictograma: Pictogram;
};

export type GameOption = {
  id_nombre_pictograma: number;
  nombre: string;
  descripcion: string;
  tiene_locucion: boolean;
  tipo: number;
  nombre_plural: string;
  correcta: 0 | 1;
};
