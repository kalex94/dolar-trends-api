import { ICategoria } from '../../Types/ICategoria'
import { mongoConfigs } from './configs/mongoConfigs'
import { dolarBlueModel } from './models/dolarBlueModel'

const defaultMaxData = 500

export async function getDolarBlueMongo(db: string, dateRange: { start: string, end: string } | null): Promise<ICategoria | null> {
  try {
    return dolarBlueModel(mongoConfigs.getDBConnection(db)).find(
      dateRange ?
      { DATETIME: { $gte: dateRange.start, $lte: dateRange.end } } :
      {}
      ,
      '-_id'
    )
    .sort({ DATETIME: -1 })
    .limit(dateRange ? defaultMaxData : 1)
    .then((data: any) => {
      return data
    }).catch((e: string) => {
      console.log(e)
      return null
    })
  } catch (error) {
    console.log(error)
    return null
  }
}
