import mongoose, { Connection } from 'mongoose'

const dbConnections: { [db: string]: Connection } = {}

export const mongoConfigs = {
  filesPath: () => { return (process.env.FILES_PATH) },
  dbs: () => {
    return ([
      process.env.DB_NAME || ''
    ])
  },
  timeZone: () => { return process.env.TIMEZONE },
  connectDB: (dbs: string[]) => {
    const options = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
    const user = process.env.DB_USER
    const pass = process.env.DB_PASS
    const ip = process.env.DB_IP
    const port = process.env.DB_PORT
    dbs.forEach(db => {
      try {
        dbConnections[db] = mongoose.createConnection('mongodb://' + user + ':' + pass + '@' + ip + ':' + port + '/' + db + '?authSource=admin', options)
      } catch {
        console.log('Error al conectar a la base de datos: ' + db)
      }
    })
  },
  getAllDBConnections: () => { return dbConnections },
  getDBConnection: (db: string) => { return dbConnections[db] }
}
