import mongoose,{ Connection } from 'mongoose'

const coleccion = 'general_settings'

const schema = new mongoose.Schema(
  {
    TYPE: String,
    VALUE: String
  },
  { versionKey: false }
)

export const generalSettingsModel = (connection: Connection) => { return connection.model(coleccion, schema, coleccion) }
