import { Router } from 'express'
import { runCopyrightersTask } from '../services/arsenkin.js'
import type { ArsenkinData } from '../services/arsenkin.js'
import { buildTzDocument } from '../services/tzDocument.js'
import type { TzData } from '../services/tzDocument.js'

const tzRouter = Router()

// Запрос к Арсенкину: ключи, регион -> данные для формы
tzRouter.post('/fetch', async (req, res) => {
    const body = req.body as {
        queries: string[]
        se: 1 | 2
        region: number
        generateStructure?: boolean
    }

    const data: ArsenkinData = {
        queries: body.queries,
        se: body.se,
        region: body.region,
        remove_main: true,
        foreign: false
    }
    if (body.generateStructure) {
        data['generate-structure'] = true
    }

    try {
        const result = await runCopyrightersTask(data)
        res.json({ data: result })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Ошибка запроса к Арсенкину'
        res.status(502).json({ error: message })
    }
})

// Данные из формы -> заполненный Word-шаблон проекта
tzRouter.post('/generate', (req, res) => {
    const { projectId, ...data } = req.body as { projectId: number } & TzData

    try {
        const file = buildTzDocument(projectId, data)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        res.setHeader('Content-Disposition', 'attachment; filename="tz.docx"')
        res.send(file)
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Не удалось собрать ТЗ'
        res.status(400).json({ error: message })
    }
})

export { tzRouter }
