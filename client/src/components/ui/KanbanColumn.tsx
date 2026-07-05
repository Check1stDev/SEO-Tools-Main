import type { Task } from "@/api/tasks";
import TaskCard from "./TaskCard";

type KanbanColumnProps = {
    tasksData: Task[]
    onEdit: (task: Task) => void
}


const KanbanColumn = ({tasksData, onEdit}: KanbanColumnProps) => {
    return (
        <div className="p-6 font-mono max-w-4xl mx-auto bg-gray-50 min-h-screen">
            <div className="flex flex-col gap-2">
                {tasksData.map((task: Task) => {
                   return < TaskCard key={task.id} task={task} onEdit={onEdit} />
                })}
            </div>
        </div>
    )
}

export default KanbanColumn