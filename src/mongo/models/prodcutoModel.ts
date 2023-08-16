import mongoose,{ Connection } from 'mongoose'

const coleccion = 'productos'

const schema = new mongoose.Schema(
  {
    CODIGO: String,
    N_CATALOGO: String,
    CATEGORIA: String,
    MODELO: String,
    MARCA: String,
    TIPO: String,
    DESC_CORTA: String,
    DESC_COMPLETA: String,
    IMAGENES: [String],
    HABILITADO: Boolean,
  },
  { versionKey: false }
)

export const productoModel = (connection: Connection) => { return connection.model(coleccion, schema, coleccion) }
