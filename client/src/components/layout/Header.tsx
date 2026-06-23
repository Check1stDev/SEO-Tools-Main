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
  

    const handleClick = (project: Project) => {
        setActiveProject(project)
    }

    return (<header>
        Apex SEO Platform
        <div>{activeProject?.name}</div>
        <div>
            {projects.map((project: Project)=> (
                    <button key={project.id} onClick={() => handleClick(project)}>
                        <div>Название: {project.name}</div>
                        <div>Адрес: {project.url}</div>
                    </button>
            ))}
            </div>
        </header>)
        
}
