import { IDefaultStatus } from '../../Types/IDefaultStatus'
import { mongoConfigs } from './configs/mongoConfigs'
import { dolarBlueModel } from './models/dolarBlueModel'

export async function addDolarBlueMongo(db: string, valueBuy: number, valueAvg: number, valueSell: number, datetime: Date): Promise<IDefaultStatus> {
  try {
    return dolarBlueModel(mongoConfigs.getDBConnection(db)).updateOne(
      { DATETIME: datetime},
      {
        VALUE_BUY: valueBuy,
        VALUE_AVG: valueAvg,
        VALUE_SELL: valueSell,
        DATETIME: datetime
      },
      { upsert: true }
    ).then((data: any) => {
      return { status: 'success', payload: null }
    }).catch((e: string) => {
      console.log(e)
      return { status: 'error', payload: null }
    })
  } catch (error) {
    console.log(error)
    return { status: 'error', payload: null }
  }
}
