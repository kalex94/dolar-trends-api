import { mongoConfigs } from './configs/mongoConfigs'
import { divisaModel } from './models/divisaModel'

export async function updateCategoryMongo(db: string, category: string, data: any) {
  try {
    return divisaModel(mongoConfigs.getDBConnection(db)).findOneAndUpdate({ CODIGO: category }, data).then(() => {
      return { STATUS: 'OK', PAYLOAD: null }
    }).catch((e: string) => {
      console.log(e)
      return { STATUS: 'ERROR', PAYLOAD: null }
    })
  } catch (error) {
    console.log(error)
    return { STATUS: 'ERROR', PAYLOAD: null }
  }
}
