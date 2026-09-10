import { Router } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'
import { createResourceRouter } from './resource.js'

const apiRouter = Router()

apiRouter.use('/users', createResourceRouter(User))
apiRouter.use('/teams', createResourceRouter(Team))
apiRouter.use('/activities', createResourceRouter(Activity))
apiRouter.use('/leaderboard', createResourceRouter(Leaderboard))
apiRouter.use('/workouts', createResourceRouter(Workout))

export default apiRouter
