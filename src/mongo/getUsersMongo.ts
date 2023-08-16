import { IUser } from '../../Types/IUser'
import { mongoConfigs } from './configs/mongoConfigs'
import { userModel } from './models/userModel'

export async function getUsersMongo (db: string, user?: string): Promise<IUser | null> {
  try {
    return userModel(mongoConfigs.getDBConnection(db)).find(user ? { USER: user} : {}, '-_id -PASSWORD').then((data: any) => {
      return data
    }).catch((e: string) => {
      console.log(e)
      return null
    })
  } catch (error) {
    console.log(error)
    return null
  }
}
