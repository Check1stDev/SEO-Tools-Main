import type { Task } from "@/api/tasks";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from "react"
import { ProjectContext } from '@/context/ProjectContext'
import { deleteTask } from '@/api/tasks'

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({task}: TaskCardProps) => {
    const context = useContext(ProjectContext)
        if(!context) return null
    const { activeProject } = context

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (taskId: string) => {
            await deleteTask(activeProject!.id, taskId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', activeProject?.id] })
        }
    })

    return (
        <div className="border border-gray-400 p-4 mb-4 rounded bg-white">
            <h3 className="font-bold text-lg mb-2">
                {task.title}
            </h3>
            <div className="text-sm text-gray-800 mb-2">
                <span className="font-semibold">Статус:</span> {task.taskStatus} | 
                <span className="font-semibold"> Приоритет:</span> {task.priority} | 
                <span className="font-semibold"> Проект:</span> {task.projectId}
            </div>
            <hr className="my-3 border-gray-300" />

            {task.description && (
                <p className="text-sm mb-2">
                <span className="font-semibold">Описание:</span> {task.description}
                </p>
            )}

            {task.taskStatus === 'done' && task.result && (
                <p className="text-sm text-green-700 mb-2">
                    <span className="font-semibold">Результат:</span> {task.result}
                </p>
            )}

            <div className="text-xs text-gray-500 mt-3">
                Создано: {task.createdAt}
            </div>
            <button  
            type="button" 
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={()=> mutation.mutate(task.id)} 
            >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Удалить задачу</button>
        </div>
    )
}

export default TaskCard

