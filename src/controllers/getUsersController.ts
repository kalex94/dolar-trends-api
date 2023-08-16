import { Request, Response } from 'express'
import { tokenDecode } from '../libraries/tokenDecode'
import { mongoConfigs } from '../mongo/configs/mongoConfigs'
import { getUsersMongo } from '../mongo/getUsersMongo'

export function getUsersController (req: Request, res: Response) {
  const decodedToken = tokenDecode(req)
  if (decodedToken) {
    if (decodedToken.ROL === 'ADMIN') {
      getUsersMongo(mongoConfigs.dbs()[0]).then(data => {
        res.status(200).json(data)
      })
    } else {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
}
