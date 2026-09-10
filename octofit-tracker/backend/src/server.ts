import express from 'express'
import { connectDatabase } from './config/database.js'
import apiRouter from './routes/index.js'

const app = express()
const port = 8000
//se verifican datos de entorno para saber si se esta ejecutando en un codespace o localmente, y se asigna la url base de la api
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl })
})

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`)
  void connectDatabase()
})
