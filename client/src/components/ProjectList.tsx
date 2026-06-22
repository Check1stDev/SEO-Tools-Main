import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/projects'

type Project = {
  id: number
  name: string
  url: string
}
export default function ProjectList() {
  const {data, isLoading, isError} = useQuery({
  queryKey: ['projects'],
  queryFn: getProjects
})

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка загрузки</div>

  const projects: Project[] = data.data
  
  return (
    
    <div>
      {projects.map((project: Project)=> (
        <div key={project.id}>
          <div>Название: {project.name}</div>
          <div>Адрес: {project.url}</div>
        </div>
      ))}
    </div>
  )
}