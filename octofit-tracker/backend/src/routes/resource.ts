import { Router, type Request, type Response } from 'express'
import type { Model } from 'mongoose'

export function createResourceRouter(model: Model<unknown>) {
  const router = Router()

  router.get('/', async (_request: Request, response: Response) => {
    try {
      const documents = await model.find().lean().exec()
      response.json(documents)
    } catch (error) {
      console.error('Failed to list resource:', error)
      response.status(503).json({ error: 'Database unavailable' })
    }
  })

  router.post('/', async (request: Request, response: Response) => {
    try {
      const document = await model.create(request.body)
      response.status(201).json(document)
    } catch (error) {
      console.error('Failed to create resource:', error)
      response.status(400).json({ error: 'Invalid resource data' })
    }
  })

  return router
}
