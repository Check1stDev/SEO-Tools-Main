import { createContext } from "react";

type Project = {
  id: number
  name: string
  url: string
}

type ProjectContextType = {
    activeProject: Project | null,
    setActiveProject: (project: Project) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export {ProjectContext}
export type {Project}
