import express from 'express'
import cors from 'cors'
import { projects } from './data/projects.js'

const app = express()

app.use(cors())

app.get('/projects', (req,res) => {
        res.json({data: projects})
    })

app.listen(3000,() => {
    console.log('Server started on port 3000')
} )