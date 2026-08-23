import express from 'express'

import userRoutes from './routes/users.routes.js'
import eventRoutes from './routes/event.routes.js'

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)

export default app