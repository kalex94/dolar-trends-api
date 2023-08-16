import { Request, Response } from 'express'
import { tokenDecode } from '../libraries/tokenDecode'
import { mongoConfigs } from '../mongo/configs/mongoConfigs'
import { newUserMongo } from '../mongo/newUserMongo'

export function newUserController (req: Request, res: Response) {
  const dataInput = req.body

  const decodedToken = tokenDecode(req)
  if (decodedToken) {
    if (decodedToken.ROL === 'ADMIN') {
      const data = {
        USER: dataInput.USER,
        NOMBRES: dataInput.NOMBRES,
        APELLIDOS: dataInput.APELLIDOS,
        ROL: dataInput.ROL,
        PASSWORD: dataInput.PASSWORD,
        HABILITADO: true
      }

      newUserMongo(data, mongoConfigs.dbs()[0]).then(data => {
        res.status(200).json(data)
      })
    } else res.sendStatus(401)
  } else res.sendStatus(401)
}
