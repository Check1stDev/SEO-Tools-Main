import type { Task } from "@/api/tasks";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

type DashboardTaskItemProps = {
    tasksData: Task[]
}


const DashboardTaskItem = ({tasksData}: DashboardTaskItemProps) => {
    const priorityWeight = {
        urgent: 1,
        high: 2,
        normal: 3,
        low: 4
    }

    const priorityName = {
        urgent: 'Срочный',
        high: 'Высокий',
        normal: 'Нормальный',
        low: 'Низкий'
    }
    
    const newTasksData = tasksData
        .filter(item => item.taskStatus !== "done")
        .sort((a,b)=> priorityWeight[a.priority] - priorityWeight[b.priority])
        .slice(0, 5)
    
    const ruPriority = (taskPriority: Task["priority"]) => {
        return priorityName[taskPriority]
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-6">
                Актуальные задачи
            </h2>
            <div className="flex flex-col gap-2">
                {newTasksData.map((task: Task) => {
                   return <Card className="w-full max-w-sm" key={task.id}>
                        <CardHeader>
                            <CardTitle>{task.title}</CardTitle>
                            <CardDescription>{task.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>Приоритет: {ruPriority(task.priority)}</div>
                            <div>Дата создания: {task.createdAt}</div>
                        </CardContent>
                    </Card>
                })}
            </div>
        </div>
    )
}

export default DashboardTaskItem
