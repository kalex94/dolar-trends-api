import { Request, Response } from 'express'
import { tokenDecode } from '../libraries/tokenDecode'
import { mongoConfigs } from '../mongo/configs/mongoConfigs'
import { updateCategoryMongo } from '../mongo/updateCategoryMongo'

export function updateCategoryController(req: Request, res: Response) {
  const category = req.params.codigo
  const data = req.body
  
  updateCategoryMongo(mongoConfigs.dbs()[0], category, data).then(data => {
    if (data.STATUS === 'OK') {
      res.status(200).json({ STATUS: 'OK', PAYLOAD: null })
    } else {
      res.status(500).json({ STATUS: 'ERROR_DB', PAYLOAD: null })
    }
  }).catch(e => {
    console.log(e)
    res.status(500).json({ STATUS: 'ERROR_DB', PAYLOAD: null })
  })
}
