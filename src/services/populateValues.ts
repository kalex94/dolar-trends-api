import axios from 'axios'
import { IBluelyticsAPIType } from '../../Types/IBluelyticsAPIType'
import { addDolarBlueMongo } from '../mongo/addDolarBlueMongo'
import { mongoConfigs } from '../mongo/configs/mongoConfigs'

// milliseconds
const defaultInterval = 60 * 1000

export async function populateValues () {
  const interval = defaultInterval + (Math.random() * 10000)
  const dolarBlueAPI = process.env.DOLAR_BLUE_API
  let lastUpdate = new Date()
  if (dolarBlueAPI) {
    axios.get(dolarBlueAPI).then(res => {
      const body: undefined | IBluelyticsAPIType = res.data
      let buyValue = -1
      let avgValue = -1
      let sellValue = -1
      let datetime: Date | null = null

      if (body) {
        if (body) {
          try {
            buyValue = body.blue.value_buy
            avgValue = body.blue.value_avg
            sellValue = body.blue.value_sell
            datetime = new Date(body.last_update)
            lastUpdate = new Date(body.last_update)
          } catch {}
        }
      }
      if (buyValue > -1 && avgValue > -1 && sellValue > -1 && datetime) {
        addDolarBlueMongo(mongoConfigs.dbs()[0], buyValue, avgValue, sellValue, datetime).then(() => {
          setTimeout(() => populateValues(), interval)
        })
      } else {
        setTimeout(() => populateValues(), interval)
      }
    })
  }
}
