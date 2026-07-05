import { useContext, useState} from "react"
import { ProjectContext } from '../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from "@/api/tasks"
import KanbanBoard from '@/components/ui/KanbanBoard'
import TaskForm  from '@/components/ui/TaskForm'
import type { Task } from "@/api/tasks"

export default function Tasks(){
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

      const context = useContext(ProjectContext)
        if(!context) return null
    const { activeProject } = context

    const { data: tasksData, isLoading: tasksIsLoading, isError: tasksIsError } = useQuery({
        queryKey: ['tasks',activeProject?.id],
        queryFn: () => getTasks (activeProject!.id),
        enabled: !!activeProject
    })
    if (tasksIsLoading) return <div>Загрузка...</div>
    if (tasksIsError) return <div>Ошибка загрузки</div>
    if (!tasksData) return null

    const tasks: Task[] = tasksData.data

    const handleEdit = (task: Task) => {
        setEditingTask(task)
        setIsFormOpen(true)
    }

    return (
        <div>
            <button onClick={()=> {setIsFormOpen(true), setEditingTask(null)}}>Добавить задачу +</button>
            {isFormOpen && <TaskForm task={editingTask ?? undefined} onClose={() =>{ 
                setIsFormOpen(false)
                setEditingTask(null)
                }}/>}
            <KanbanBoard tasksData={tasks} onEdit={handleEdit} />
        </div>
    )
}