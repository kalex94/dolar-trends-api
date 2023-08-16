import { mongoConfigs } from './configs/mongoConfigs'
import { userModel } from './models/userModel'

interface IPost {
  USER: string,
  CHANGES: {
    [key: string]: any
  }
}

export async function updateUserMongo (post: IPost, db: string) {
  try {
    return userModel(mongoConfigs.getDBConnection(db)).findOneAndUpdate({ USER: post.USER }, post.CHANGES).then(() => {
      return 'ACEPTADO'
    }).catch((e: string) => {
      console.log(e)
      return 'ERROR-DB'
    })
  } catch (error) {
    console.log(error)
    return 'ERROR-DB'
  }
}
