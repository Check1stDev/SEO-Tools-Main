import { useContext } from "react"
import { ProjectContext } from '../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from "@/api/tasks"
import KanbanBoard from '@/components/ui/KanbanBoard'
import type { Task } from "@/api/tasks"

export default function Tasks(){
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

    return (
        <div>
            <KanbanBoard tasksData={tasks} />
        </div>
    )
}