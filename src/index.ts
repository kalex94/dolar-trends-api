import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes/routes'
import { mongoConfigs } from './mongo/configs/mongoConfigs'
import { setDefaultUserMongo } from './mongo/setDefaultUserMongo'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import { setImagesFolder } from './mongo/setImagesFolder'
import path from 'path'
import { populateValues } from './services/populateValues'

const app = express()

require('dotenv').config({ path: './.env' })

app.use(cors())

// app.use(connectHistoryApiFallback({
//   verbose: false
// }))
app.use(express.static(path.join(__dirname, 'out')))
app.use('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'))
})

// middlewares de seguridad
const limits = { limit: '25000kb', parameterLimit: 50000 }
app.use(express.json(limits))
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use('/api', routes)

// conexiones con db
mongoConfigs.connectDB(mongoConfigs.dbs())

setDefaultUserMongo(mongoConfigs.dbs()[0])
setImagesFolder()
populateValues()

const port = process.env.PORT

app.listen(port, () => {
  console.log(`SERVIDOR LISTO; ESCUCHANDO EN PUERTO ${port}`)
})
