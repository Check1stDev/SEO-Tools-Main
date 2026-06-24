import express from 'express'
import cors from 'cors'
import { projects } from './data/projects.js'
import { metricsData } from './data/metrics.js'
import { trafficData } from './data/traffic.js'
import { keywordsData } from './data/keywords.js'

const app = express()

app.use(cors())

app.get('/projects', (req,res) => {
        res.json({data: projects})
    })

app.get('/projects/:id/metrics', (req,res) => {
        res.json({data: metricsData.find(item => item.projectId === Number(req.params.id))})
    })

app.get('/projects/:id/traffic', (req,res) => {
        res.json({data: trafficData.filter((item) => item.projectId === Number(req.params.id))})
    })

app.get('/projects/:id/keywords', (req,res) => {
        res.json({data: keywordsData.filter((item) => item.projectId === Number(req.params.id))})
    })

app.listen(3000,() => {
    console.log('Server started on port 3000')
} )
