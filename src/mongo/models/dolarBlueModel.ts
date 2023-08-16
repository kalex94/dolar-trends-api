import mongoose,{ Connection } from 'mongoose'

const coleccion = 'dolar-blue-values'

const schema = new mongoose.Schema(
  {
    VALUE_SELL: Number,
    VALUE_BUY: Number,
    VALUE_AVG: Number,
    DATETIME: Date,
    SOURCE: String,
  },
  { versionKey: false }
)

export const dolarBlueModel = (connection: Connection) => { return connection.model(coleccion, schema, coleccion) }
