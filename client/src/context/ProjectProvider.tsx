import { useState } from 'react'
import { ProjectContext }  from './ProjectContext.tsx'
import type { Project }  from './ProjectContext.tsx'


type Props = {
    children: React.ReactNode
}

export function ProjectProvider ({children}: Props){
    const [activeProject, setActiveProject ] = useState<Project | null>(null)
    return (
        <ProjectContext.Provider value={{activeProject, setActiveProject}}>
            {children}
        </ProjectContext.Provider>
    )
}