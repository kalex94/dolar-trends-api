import mongoose,{ Connection } from 'mongoose'

const coleccion = 'usuarios'

const schema = new mongoose.Schema(
  {
    USER: String,
    NOMBRE: String,
    APELLIDO: String,
    ROL: String,
    PASSWORD: String,
    HABILITADO: Boolean
  },
  { versionKey: false }
)

export const userModel = (connection: Connection) => { return connection.model(coleccion, schema, coleccion) }
