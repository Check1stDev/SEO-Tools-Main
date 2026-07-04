import type { Task } from "@/api/tasks";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({task}: TaskCardProps) => {
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
        </div>
    )
}

export default TaskCard

