import { Request, Response } from 'express'
import jwt from 'jwt-simple'
import { ILoginUser } from '../../Types/ILoginUser'
import { mongoConfigs } from '../mongo/configs/mongoConfigs'
import { loginSessionMongo } from '../mongo/loginSessionMongo'

export function loginSessionController (req: Request, res: Response) {
  const dataInput = req.query

  const post: ILoginUser = {
    USER: dataInput.user?.toString() || '',
    PASSWORD: dataInput.pass?.toString() || ''
  }

  loginSessionMongo(post, mongoConfigs.dbs()[0]).then(data => {
    if (data.STATUS === 'OK') {
      const jsonToken = jwt.encode(data.PAYLOAD, process.env.TOKEN_KEY || 'secret')
      const outData = {
        STATUS: 'OK',
        PAYLOAD: {
          USER: data.PAYLOAD?.USER,
          NOMBRE: data.PAYLOAD?.NOMBRE,
          APELLIDO: data.PAYLOAD?.APELLIDO,
          ROL: data.PAYLOAD?.ROL,
          TOKEN: jsonToken
        }
      }
      res.status(200).json(outData)
    } else if (data.STATUS === 'INVALID') {
      res.status(401).json({ STATUS: 'INVALID', PAYLOAD: null })
    } else {
      res.status(400).json({ STATUS: 'ERROR', PAYLOAD: null })
    }
  }).catch((e: string) => {
    res.status(400).json({ STATUS: 'ERROR', PAYLOAD: null })
  })
}
