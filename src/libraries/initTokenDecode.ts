import jwt from 'jwt-simple'
import { Request } from 'express'

export function initTokenDecode (req: Request) {
  try {
    if (req.headers.authorization) {
      const decoded = jwt.decode(req.headers.authorization.split(' ')[1], process.env.TOKEN_KEY || 'secret')
      if (decoded) {
        const mandatoryFields = ['USER', 'ROL']
        if (mandatoryFields.every(field => Object.keys(decoded).includes(field))) {
          return decoded
        }
        return false
      }
      return decoded
    } return false
  } catch {
    return false
  }
}
