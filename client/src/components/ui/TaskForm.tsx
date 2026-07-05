import type { Task } from "@/api/tasks";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from "react"
import { ProjectContext } from '@/context/ProjectContext'
import { addTask, updTask } from '@/api/tasks'

type TaskFormProps = {
  task?: Task;
  onClose: () => void
};

const TaskForm = ({ task, onClose }: TaskFormProps) => {
    const context = useContext(ProjectContext)
        if(!context) return null
    const { activeProject } = context

    const queryClient = useQueryClient()

    const createTask = useMutation({
        mutationFn: async (task: Omit <Task, 'id' | 'createdAt'>) => {
            await addTask(activeProject!.id, task)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', activeProject?.id] })
            onClose()
        }
    })

    const updateTask = useMutation({
        mutationFn: async (task: Partial<Task>) => {
            await updTask(activeProject!.id, task.id!, task)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', activeProject?.id] })
            onClose()
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const rawData = Object.fromEntries(formData.entries())

        const taskData: Omit <Task, 'id' | 'createdAt'> = {
            taskStatus: rawData.taskStatus as Task['taskStatus'],
            title: rawData.title as Task['title'],
            description: rawData.description as Task['description'],
            priority: rawData.priority as Task['priority'],
            projectId: activeProject!.id,
        }
        if (task) {
            updateTask.mutate({ ...taskData, id: task.id })
        } else {
            createTask.mutate(taskData)
        }
    }
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} action="" className="max-w-md p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900"></h2>
            <div className="mb-4">
                <label htmlFor="">Название задачи</label>
                <input name="title" type="text" defaultValue={task?.title} />
            </div>
            <div className="mb-4"><label htmlFor="">Приоритет</label>
                <select name="priority" id="" defaultValue={task?.priority} >
                    <option value="low">Низкий</option>
                    <option value="normal">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="urgent">Срочный</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="">Статус</label>
                <select
                    defaultValue={task?.taskStatus} 
                    name="taskStatus"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <option value="todo">К выполнению</option>
                    <option value="in_progress">В процессе</option>
                    <option value="done">Готово (Done)</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor=""></label>
                <textarea name="description" defaultValue={task?.description} ></textarea>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button onClick={onClose}
                type="button"
                className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                >
                Отмена
                </button>

                <button
                type="submit"
                className="px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                Сохранить
                </button>
            </div>
        </form>
        </div>
    )
}

export default TaskForm