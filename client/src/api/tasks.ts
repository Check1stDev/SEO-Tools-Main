import axios from "axios";

type Task = {
    id: string
    projectId: number
    taskStatus: 'todo' | 'in_progress' | 'done'
    title: string
    description?: string
    priority: 'low' | 'normal' | 'high' | 'urgent'
    result?: string
    createdAt: string
}

const getTasks = async (id: number) => {
    const result = await axios.get(`http://localhost:3000/projects/${id}/tasks`)
    return result.data 
}
 
const addTask = async (id: number, task: Omit <Task, 'id' | 'createdAt'> ) => {
    const result = await axios.post(`http://localhost:3000/projects/${id}/tasks`, task)
    return result.data 
}

const updTask = async (id: number, taskId: string, task: Partial <Task>) => {
    const result = await axios.patch(`http://localhost:3000/projects/${id}/tasks/${taskId}/`, task)
    return result.data
}

const deleteTask = async (id: number, taskId: string) => {
    const result = await axios.delete(`http://localhost:3000/projects/${id}/tasks/${taskId}/`)
    return result.data
}

export { getTasks, addTask, updTask, deleteTask }
export type { Task }