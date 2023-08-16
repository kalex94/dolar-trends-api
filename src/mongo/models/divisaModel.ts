import mongoose,{ Connection } from 'mongoose'

const coleccion = 'divisas'

const schema = new mongoose.Schema(
  {
    NAME: String,
    CODE: String,
    ENABLED: Boolean,
  },
  { versionKey: false }
)

export const divisaModel = (connection: Connection) => { return connection.model(coleccion, schema, coleccion) }
