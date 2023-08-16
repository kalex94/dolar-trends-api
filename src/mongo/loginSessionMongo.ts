import { ILoginUser } from '../../Types/ILoginUser'
import { mongoConfigs } from './configs/mongoConfigs'
import { userModel } from './models/userModel'

interface resType {
  STATUS: string,
  PAYLOAD: {
    USER: string,
    NOMBRE: string,
    APELLIDO: string,
    ROL: string
  } | null
}

export async function loginSessionMongo(post: ILoginUser, db: string): Promise<resType> {
  try {
    const requests = '-_id USER NOMBRE APELLIDO ROL'
    return userModel(mongoConfigs.getDBConnection(db)).findOne(post, requests).then((findedUser: any) => {
      if (findedUser && findedUser.USER) {
        return { STATUS: 'OK', PAYLOAD: findedUser }
      } else {
        return { STATUS: 'INVALID', PAYLOAD: null }
      }
    }).catch((e: string) => {
      console.log(e)
      return { STATUS: 'ERROR_DB', PAYLOAD: null }
    })
  } catch (e) {
    console.log(e)
    return { STATUS: 'ERROR_DB', PAYLOAD: null }
  }
}
