import { useContext } from "react"
import { ProjectContext } from '../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getMetrics } from '../api/metrics'
import type { Metrics } from '../context/ProjectContext'
import MetricCard from '../components/ui/MetricCard'


export default function Dashboard(){

    const context = useContext(ProjectContext)
        if(!context) return null
    const { activeProject } = context

    const {data, isLoading, isError} = useQuery({
        queryKey: ['metrics',activeProject?.id],
        queryFn: () => getMetrics(activeProject!.id),
        enabled: !!activeProject
    })

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка загрузки</div>
    if(!data) return null

    const metrics: Metrics = data.data

    return (
        <>
            <div>{activeProject?.name}</div>
            <div className="flex gap-4">
                <MetricCard name="Трафик" value={metrics.traffic} />
                <MetricCard name="Позиции" value={metrics.positions} />
                <MetricCard name="Лиды" value={metrics.leads} />
                <MetricCard name="Конверсия" value={metrics.conversion} />
            </div>
        </>
    )
}