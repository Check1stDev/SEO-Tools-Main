import { useContext } from "react"
import { ProjectContext } from '../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getMetrics } from '../api/metrics'
import { getTraffic } from '../api/traffic'
import type { Metrics } from '../context/ProjectContext'
import type { TrafficPoint } from '../components/ui/TrafficChart'
import MetricCard from '../components/ui/MetricCard'
import IndexLineChart from '../components/ui/TrafficChart'


export default function Dashboard(){

    const context = useContext(ProjectContext)
        if(!context) return null
    const { activeProject } = context

    const {data, isLoading, isError} = useQuery({
        queryKey: ['metrics',activeProject?.id],
        queryFn: () => getMetrics(activeProject!.id),
        enabled: !!activeProject
    })

    const { data: trafficData, isLoading: trafficIsLoading, isError: trafficIsError } = useQuery({
        queryKey: ['traffic',activeProject?.id],
        queryFn: () => getTraffic(activeProject!.id),
        enabled: !!activeProject
    })

    if (isLoading || trafficIsLoading) return <div>Загрузка...</div>
    if (isError || trafficIsError) return <div>Ошибка загрузки</div>
    if(!data || !trafficData) return null

    const metrics: Metrics = data.data
    const traffic: TrafficPoint[] = trafficData.data

    return (
        <>
            <div>{activeProject?.name}</div>
            <div className="flex gap-4">
                <MetricCard name="Трафик" value={metrics.traffic} />
                <MetricCard name="Позиции" value={metrics.positions} />
                <MetricCard name="Лиды" value={metrics.leads} />
                <MetricCard name="Конверсия" value={metrics.conversion} />
            </div>
            <div className="flex gap-4">
                <IndexLineChart data = {traffic}/>
            </div>
        </>
    )
}