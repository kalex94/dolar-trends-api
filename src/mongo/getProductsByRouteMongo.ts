import { mongoConfigs } from './configs/mongoConfigs'
import { divisaModel } from './models/divisaModel'
import fs from 'fs'

interface IOutData {
  NOMBRE: string,
  PRODUCTOS: {
    MARCA: string,
    MODELO: string,
    TIPO: string,
    DESC_CORTA: string,
    DESC_COMPLETA: string,
    IMAGENES: string[],
    N_CATALOGO: number
  }[]
}
const paginationDefaultLimit = '15'

export async function getProductsByRouteMongo (ruta: string, page: string, db: string): Promise<{ STATUS: string, PAYLOAD: IOutData | null }> {
  // console.log(ruta)
  // console.log(page)
  const paginationLimit = parseInt(process.env.PRODUCTS_PAGINATION_LIMIT || paginationDefaultLimit)

  try {
    const categorias: IOutData[] = await divisaModel(mongoConfigs.getDBConnection(db)).aggregate([
      {
        '$match': { 'RUTA': ruta }  
      },
      {
        '$lookup': {
          'from': 'productos',
          'as': 'PRODUCTOS',
          'let': { 'ident_codigo': '$CODIGO' },
          'pipeline': [
            { '$match': { '$expr': { '$eq': [ '$CATEGORIA', '$$ident_codigo' ] }}},
            { '$skip': (parseInt(page || '1') - 1) * paginationLimit },
            { '$limit': paginationLimit}
          ],
        }
      },
      {
        '$project': {
          'NOMBRE': '$NOMBRE',
          'PRODUCTOS': {
            '$map': {
              'input': '$PRODUCTOS',
              'as': 'producto',
              'in': {
                'MARCA': '$$producto.MARCA',
                'MODELO': '$$producto.MODELO',
                'TIPO': '$$producto.TIPO',
                'DESC_CORTA': '$$producto.DESC_CORTA',
                'DESC_COMPLETA': '$$producto.DESC_COMPLETA',
                'IMAGENES': '$$producto.IMAGENES',
                'N_CATALOGO': '$$producto.N_CATALOGO'
              }
            }
          } 
        }
      }
    ])
    const outData = {
      NOMBRE: categorias[0].NOMBRE,
      PRODUCTOS: categorias[0].PRODUCTOS.map(prod => {
        return {
          ...prod,
          IMAGENES: prod.IMAGENES.map(imgPath => {
            return fs.readFileSync(process.env.IMAGES_PATH + '/productos/' + imgPath, {encoding: 'base64'})
          })
        }
      })
    }
    return { STATUS: 'OK', PAYLOAD: outData }
  } catch (e) {
    return { STATUS: 'ERROR', PAYLOAD: null }
  }
}
