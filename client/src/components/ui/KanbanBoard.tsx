import type { Task } from "@/api/tasks";
import KanbanColumn from './KanbanColumn'


type KanbanBoardProps = {
    tasksData: Task[]
}

const KanbanBoard = ({tasksData}: KanbanBoardProps) => {
    const todo = tasksData.filter(task => task.taskStatus === 'todo')
    const inProgress = tasksData.filter(task => task.taskStatus === 'in_progress')
    const done = tasksData.filter(task => task.taskStatus === 'done')
    return(
    <>
        <button>Добавить задачу +</button>
        <div className="flex flex-col md:flex-row gap-6 p-6 items-start min-h-screen bg-gray-50">
            <div className="flex-1 w-full bg-gray-200/50 rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-700">План</h2>
                    <span className="bg-gray-300 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">
                        {todo.length}
                    </span>
                </div>
                <KanbanColumn tasksData={todo}/>
            </div>

            <div className="flex-1 w-full bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-blue-800">В работе</h2>
                    <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                        {inProgress.length}
                    </span>
                </div>
                <KanbanColumn tasksData={inProgress}/>
            </div>

            <div className="flex-1 w-full bg-green-50 rounded-xl p-4 shadow-sm border border-green-100">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-green-800">Выполнены</h2>
                    <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                        {done.length}
                    </span>
                </div>
                <KanbanColumn tasksData={done}/>
            </div>

        </div>
    </>
    )
}

export default KanbanBoard