import { Request } from 'express'
import jwt from 'jwt-simple'

export function tokenDecode (req: Request) {
  try {
    if (req.headers.authorization) {
      const decoded = jwt.decode(req.headers.authorization.split(' ')[1], process.env.TOKEN_KEY || 'secret')
      if (decoded) {  
        if (['ADMIN', 'PROFESIONAL'].includes(decoded.ROL)) {
          const mandatoryKeys = ['USER', 'ROL', 'ORGANIZACION', 'TOKEN_START_TIME', 'TOKEN_EXPIRATION_TIME']
          if (Object.keys(decoded).every(key => mandatoryKeys.includes(key))) {
            // const now = new Date().getTime()
            // if ((decoded.TOKEN_START_TIME + decoded.TOKEN_EXPIRATION_TIME) < now) {
              return decoded
            // }
          }
          return false
        } else if (decoded.ROL === 'PACIENTE') {
          const mandatoryKeys = ['ROL', 'DNI', 'GENERO', 'NOMBRES', 'APELLIDOS', 'FECHA_NACIMIENTO', 'DIRECCION', 'TELEFONO']
          if (Object.keys(decoded).every(key => mandatoryKeys.includes(key))) {
            // const now = new Date().getTime()
            // if ((decoded.TOKEN_START_TIME + decoded.TOKEN_EXPIRATION_TIME) < now) {
              return decoded
            // }
          }
          return false
        }
      }
      return decoded
    } else {
      return false
    }
  } catch {
    return false
  }
}
