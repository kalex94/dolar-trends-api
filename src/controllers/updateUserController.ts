import { Request, Response } from 'express'
import { tokenDecode } from '../libraries/tokenDecode'
import { updateUserMongo } from '../mongo/updateUserMongo'
import { mongoConfigs } from '../mongo/configs/mongoConfigs'

export function updateUserController (req: Request, res: Response) {
  const dataInput = req.body
  const decodedToken = tokenDecode(req)
  if (decodedToken) {
    const data = {
      USER: dataInput.USER,
      CHANGES: {
        NOMBRES: dataInput.NOMBRES || '',
        APELLIDOS: dataInput.APELLIDOS || '',
        ROL: dataInput.ROL || '',
        PASSWORD: dataInput.PASSWORD || '',
        HABILITADO: dataInput.HABILITADO || 'none'
      }
    }

    if (!data.CHANGES.NOMBRES) {
      delete data.CHANGES.NOMBRES
    }

    if (!data.CHANGES.APELLIDOS) {
      delete data.CHANGES.APELLIDOS
    }

    if (!data.CHANGES.ROL) {
      delete data.CHANGES.ROL
    }

    if (typeof data.CHANGES.HABILITADO !== 'boolean') {
      delete data.CHANGES.HABILITADO
    }

    if (!data.CHANGES.PASSWORD || data.CHANGES.PASSWORD === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855') {
      delete data.CHANGES.PASSWORD
    }

    updateUserMongo(data, mongoConfigs.dbs()[0]).then(data => {
      res.status(200).json(data)
    })
  } else {
    res.sendStatus(401)
  }
}
