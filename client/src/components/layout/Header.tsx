import { Fragment, useContext } from "react"
import { Link, useLocation } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../../api/projects'
import type { Project } from '../../context/ProjectContext'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger } from "@/components/ui/sidebar"

const routeNames: Record<string, string> = {
    "tools": "SEO Инструменты",
    "meta-tags": "Редактор метатегов",
    "tasks": "Проекты"
};

export default function Header(){
    const {data, isLoading, isError} = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
        })
    const context = useContext(ProjectContext)
    const location = useLocation()

    const pathnames = location.pathname.split('/').filter((item) => item)

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка загрузки</div>

  const projects: Project[] = data.data

    if(!context) return null
    const { activeProject, setActiveProject} = context

    const selectProject = (id: string) => {
        const p = projects.find((p)=> p.id === Number(id))
        setActiveProject(p!)
    }
    const isMainPage = location.pathname === '/'

    return (<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-auto"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        {isMainPage ? (<BreadcrumbPage>Главная</BreadcrumbPage>) : (<BreadcrumbLink asChild>
                            <Link to="/">Главная</Link>
                        </BreadcrumbLink>) }
                    </BreadcrumbItem>
                    {pathnames.length > 0 && <BreadcrumbSeparator className="hidden md:block"/>}
                    {pathnames.map((value ,index) => {
                        const to = `/${pathnames.slice(0,index + 1).join('/')}`
                        const title = routeNames[value] || value;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <Fragment key={to}>
                            { isLast ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to={to}>{title}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )}
                            {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                            </Fragment>                            
                        )
                    })}
                    </BreadcrumbList>
                </Breadcrumb>
            </header>)
        
}
