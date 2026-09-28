const BASE = 'https://arsenkin.ru/api/tools'

type ArsenkinData = {
    queries: string[]
    se: 1 | 2
    region: number
    urls?: string[]
    stoplist?: string[]
    stopwords?: string[]
    url?: string
    foreign?: boolean
    remove_main?: boolean
    'generate-structure'?: boolean
}

const authHeaders = () => ({
    'Authorization': `Bearer ${process.env.ARSENKIN_TOKEN}`,
    'Content-type': 'application/json'
})

const setTask = async (data: ArsenkinData): Promise<number> => {
    const res = await fetch(`${BASE}/set`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ tools_name: 'copyrighters', data })
    })
    const json = await res.json()
    if (json.code !== 'SET_TASK_OK') {
        throw new Error(json.msg || 'Не удалось поставить задачу в Арсенкине')
    }
    return json.task_id
}

const checkTask = async (taskId: number): Promise<string> => {
    const res = await fetch(`${BASE}/check`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ task_id: taskId })
    })
    const json = await res.json()
    return json.status as string
}

const getResult = async (taskId: number) => {
    const res = await fetch(`${BASE}/get`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ task_id: taskId })
    })
    const json = await res.json()
    return json.result.result
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Ставит задачу и ждёт результат, опрашивая check раз в 3 секунды.
// Останавливается после maxAttempts попыток (по умолчанию ~2 минуты), чтобы не зависнуть навсегда.
const runCopyrightersTask = async (data: ArsenkinData, maxAttempts = 40) => {
    const taskId = await setTask(data)

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const status = await checkTask(taskId)
        if (status === 'finish') {
            return getResult(taskId)
        }
        await sleep(3000)
    }

    throw new Error('Задача Арсенкина не завершилась за отведённое время')
}

export { runCopyrightersTask }
export type { ArsenkinData }
