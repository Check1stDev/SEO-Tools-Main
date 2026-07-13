import { useContext } from "react"
import { ProjectContext } from '../../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../../api/projects'
import type { Project } from '../../context/ProjectContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
Folders
} from 'lucide-react'



export default function ProjectSelector(){
    const {data, isLoading, isError} = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
        })
const context = useContext(ProjectContext)

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка загрузки</div>

  const projects: Project[] = data.data

    if(!context) return null
    const { activeProject, setActiveProject} = context

    const selectProject = (id: string) => {
        const p = projects.find((p)=> p.id === Number(id))
        setActiveProject(p!)
    }

    return (
        <Select onValueChange={(value) => selectProject(value)}>
        <SelectTrigger className="w-full max-w-48">
            <Folders />
            <SelectValue placeholder="Выберите проект" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Проекты</SelectLabel>
            {projects.map((project: Project) => (
                <SelectItem key={project.id} value={String(project.id)}>
                {project.name}
                </SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
        </Select>)
        
}

