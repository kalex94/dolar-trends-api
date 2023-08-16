import { mongoConfigs } from './configs/mongoConfigs'
import { userModel } from './models/userModel'

export async function setDefaultUserMongo (db: string) {
  try {
    userModel(mongoConfigs.getDBConnection(db)).find().then((findedUsuarios: any) => {
      if (!findedUsuarios.length) {
        const defaultUsuario = {
          USER: 'admin',
          NOMBRE: 'Administrador',
          APELLIDO: 'Administrador',
          ROL: 'ADMIN',
          PASSWORD: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
          HABILITADO: true
        }
        userModel(mongoConfigs.getDBConnection(db)).create(defaultUsuario).then(() => {
          console.log('SE CREÓ EL USUARIO POR DEFECTO - usr: admin ; pswd: admin')
        }).catch((e: string) => {
          console.log(e)
        })
      }
    }).catch((e: string) => {
      console.log(e)
    })
  } catch (error) {
    console.log(error)
  }
}
