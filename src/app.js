import express from 'express'

import userRoutes from './routes/user.routes.js'
import eventRoutes from './routes/event.routes.js'

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)

app.get('/api/health', (req,res) => {
    res.status (200).json({data:"ok"});
})

export default app