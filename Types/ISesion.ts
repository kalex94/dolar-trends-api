import { ISesionImage } from './ISesionImage'

export interface ISesion {
  ID: string,
  FECHA_HORA: Date,
  PACIENTE: {
    DNI: string,
    GENERO: string
  },
  ORGANIZACION: string,
  IMAGENES: ISesionImage[],
  PROFESIONAL: string
}
