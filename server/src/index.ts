import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs';

import { projects } from './data/projects.js'
import { metricsData } from './data/metrics.js'
import { trafficData } from './data/traffic.js'
import { keywordsData } from './data/keywords.js'
import { tasksData } from './data/tasks.js'
import type { Task } from './data/tasks.js'
import {normalizeWords, countLemmas, mapWordsToLemmas, processLemmatize, searchAllKeywords} from './services/morphology.js'
import {getSpamPercent, getAcademicNausea, waterPercent} from './services/textMetrics.js'


type keywordsFromTestCheck = {
    main: string[]
    lsi: string[],
    highlight: string[]
}

const app = express()

app.use(cors())
app.use(express.json())

app.get('/projects', (req,res) => {
        res.json({data: projects})
    })

app.get('/projects/:id/metrics', (req,res) => {
        res.json({data: metricsData.find(item => item.projectId === Number(req.params.id))})
    })

app.get('/projects/:id/traffic', (req,res) => {
        res.json({data: trafficData.filter((item) => item.projectId === Number(req.params.id))})
    })
// Ключевые слова
app.get('/projects/:id/keywords', (req,res) => {
        res.json({data: keywordsData.filter((item) => item.projectId === Number(req.params.id))})
    })
// Задачи
app.get('/projects/:id/tasks', (req,res) => {
        res.json({data: tasksData.filter((item)=> item.projectId === Number(req.params.id))})
    })

app.post('/projects/:id/tasks', (req,res) => {
    const newTtasksData = req.body as Omit <Task, 'id' | 'createdAt'>

    const newTask = {
        id: uuidv4(),
        createdAt: dayjs().format('DD.MM.YYYY HH:mm'),
        ...newTtasksData
    }
    tasksData.push(newTask)
    res.json({data: newTask})
    })

    app.patch('/projects/:id/tasks/:taskId', (req,res) => {
        const taskId = req.params.taskId
        const taskIndex = tasksData.findIndex((task) => task.id === taskId)
        if (taskIndex === -1) {
            res.status(404).json({ error: 'Task not found' })
            return
            }
        const updates = req.body as Partial <Task>
        const updTask = {
            ...tasksData[taskIndex],
            ...updates,
            id: taskId
        } as Task

        tasksData[taskIndex] = updTask

        res.json({data: updTask})

    })

    app.delete('/projects/:id/tasks/:taskId', (req,res) => {
        const taskId = req.params.taskId
        const taskIndex = tasksData.findIndex((task) => task.id === taskId)
        if (taskIndex === -1) {
            res.status(404).json({ error: 'Task not found' })
            return
            }

        tasksData.splice(taskIndex, 1)

        res.json({data: tasksData})

    })

// Лемматизатор
    app.post('/lemmas', (req,res) => {
        const keywords = req.body as string[]
        const normalize = normalizeWords(keywords)
        const lemmas = countLemmas(normalize)
        res.json({ data: lemmas})
    })

    app.post('/lemmas/map',(req,res) => {
        const words = req.body as Record<string, string[]>
        const wordsMap = processLemmatize(words)
        res.json({ data: wordsMap})
    } )
// Поиск ключей

    app.post('/searchKeys', (req,res) => {
        
        const keywords = req.body.keywords as keywordsFromTestCheck
        const text = req.body.text as string

        const mainResult = searchAllKeywords(text, keywords.main)
        const lsiResult = searchAllKeywords(text, keywords.lsi)
        const highlightResult = searchAllKeywords(text, keywords.highlight)

        const spamPercent = getSpamPercent(text)
        const academicNausea = getAcademicNausea(text)
        const water = waterPercent(text)
        
        res.json({ data: {
            main: mainResult,
            lsi: lsiResult,
            highlight: highlightResult,
            spamPercent: spamPercent,
            academicNausea: academicNausea,
            water: water
        }})
    })


app.listen(3000,() => {
    console.log('Server started on port 3000')
} )
