import mongoose,{ Connection } from 'mongoose'

const coleccion = 'sesiones'

const schema = new mongoose.Schema(
  {
    ID: String,
    ORGANIZACION: String,
    FECHA_HORA: Date,
    PACIENTE: {
      DNI: String,
      GENERO: String
    },
    IMAGENES: [{
      ID: String,
      TIPO: String,
      IMAGEN: String
    }],
    PROFESIONAL: String
    },
  { versionKey: false }
)

export const sesionModel = (connection: Connection) => { return connection.model(coleccion, schema, coleccion) }
