import fs from 'fs'
import path from 'path'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'

// Пока один шаблон на проект: id проекта -> файл в src/templates.
// Когда проектов станет больше, сюда добавляются новые записи.
const PROJECT_TEMPLATES: Record<number, string> = {
    1: 'apex.docx'
}

type TzData = {
    strictKeyword: string
    theme: string[]
}

const buildTzDocument = (projectId: number, data: TzData): Buffer => {
    const templateFile = PROJECT_TEMPLATES[projectId]
    if (!templateFile) {
        throw new Error(`Нет шаблона ТЗ для проекта ${projectId}`)
    }

    const templatePath = path.join(import.meta.dirname, '..', 'templates', templateFile)
    const zip = new PizZip(fs.readFileSync(templatePath))
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true })

    doc.render(data)

    return doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' })
}

export { buildTzDocument }
export type { TzData }
