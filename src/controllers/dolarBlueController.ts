import { Request, Response } from 'express'
import { mongoConfigs } from '../mongo/configs/mongoConfigs'
import { getDolarBlueMongo } from '../mongo/getDolarBlueMongo'


export class DolarBlueController {
  get(req: Request, res: Response) {
    const dateStartIn = req.query.from
    const dateEndIn = req.query.to
  
    let dateStartStr = ''
    let dateEndStr = ''
    
    if (
      dateStartIn && typeof dateStartIn === 'string' &&
      dateEndIn && typeof dateEndIn === 'string'
    ) {
      try {
        dateStartStr = new Date(dateStartIn).toISOString().split('T')[0]
        dateEndStr = new Date(dateEndIn).toISOString().split('T')[0]
      } catch {}
    }
  
    console.log(dateStartStr, dateEndStr)
    getDolarBlueMongo(
      mongoConfigs.dbs()[0],
      (dateStartStr && dateEndStr) ? { start: dateStartStr, end: dateEndStr } : null
    ).then(data => {
      res.status(200).json({ status: 'success', payload: data })
    }).catch(e => {
      console.log(e)
      res.status(200).json({ status: 'error', payload: {} })
    })
  }
}

