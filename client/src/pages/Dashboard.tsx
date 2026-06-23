import { useContext } from "react"
import { ProjectContext } from '../context/ProjectContext'


export default function Dashboard(){
    const context = useContext(ProjectContext)
        if(!context) return null
    const { activeProject } = context

    return (
        <div>{activeProject?.name}</div>
    )
}