import { useContext } from "react"
import { ProjectContext } from '../../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../../api/projects'
import type { Project } from '../../context/ProjectContext'



export default function Header(){
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

    return (<header>
        Apex SEO Platform
        <div>{activeProject?.name}</div>
        <select name="projects" id="" defaultValue="" onChange={(e)=>selectProject(e.target.value)}>
            {projects.map((project: Project) => (
                <option key={project.id} value={project.id} >
                        {project.name}
                </option>
            ))}
        </select>
        </header>)
        
}
