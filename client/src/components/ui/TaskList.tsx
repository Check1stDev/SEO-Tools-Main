import type { Task } from "@/api/tasks";
import TaskCard from "./TaskCard";

type TaskListProps = {
    tasksData: Task[]
}


const TaskList = ({tasksData}: TaskListProps) => {
    return (
        <div className="p-6 font-mono max-w-4xl mx-auto bg-gray-50 min-h-screen">
            <h2 className="text-xl font-bold mb-6">
                Задачи проекта (Всего: {tasksData.length})
            </h2>
            <div className="flex flex-col gap-2">
                {tasksData.map((task: Task) => {
                   return < TaskCard key={task.id} task={task} />
                })}
            </div>
        </div>
    )
}

export default TaskList