import { IUser } from '../../Types/IUser'
import { mongoConfigs } from './configs/mongoConfigs'
import { userModel } from './models/userModel'

export async function newUserMongo (post: IUser, db: string): Promise<string> {
  try {
    return userModel(mongoConfigs.getDBConnection(db)).find({ USER: post.USER }).then((findedUsers: any) => {
      if (!findedUsers.length) {
        return userModel(mongoConfigs.getDBConnection(db)).create(post).then(() => {
          return 'ACEPTADO'
        }).catch((e: string) => {
          console.log(e)
          return 'ERROR_DB'
        })
      } else {
        return 'EXISTENTE'
      }
    }).catch((e: string) => {
      console.log(e)
      return 'ERROR_DB'
    })
  } catch (error) {
    console.log(error)
    return 'ERROR_SERVER'
  }
}
