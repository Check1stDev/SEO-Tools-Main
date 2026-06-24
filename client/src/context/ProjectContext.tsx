import { createContext } from "react";

type Project = {
  id: number
  name: string
  url: string
}

type Metrics = {
  id: number
  projectId: number
  date: string 
  traffic: number
  positions: number
  leads: number
  conversion: number
}

type ProjectContextType = {
    activeProject: Project | null,
    setActiveProject: (project: Project) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export {ProjectContext}
export type {Project, Metrics}
