import { Request, Response } from 'express'
import { tokenDecode } from '../libraries/tokenDecode'

export function checkTokenController (req: Request, res: Response) {
  const dataInput = req.params.rol
  const decodedToken = tokenDecode(req)
  if (dataInput) {
    if (decodedToken) {
      if (dataInput.includes(decodedToken.ROL) || !dataInput.length) {
        res.sendStatus(200)
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  } else {
    if (decodedToken) {
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  }
}
