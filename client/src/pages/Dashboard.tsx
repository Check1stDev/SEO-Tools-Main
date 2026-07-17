import { useContext } from "react"
import { ProjectContext } from '../context/ProjectContext'
import { useQuery } from '@tanstack/react-query'
import { getMetrics } from '../api/metrics'
import { getTraffic } from '../api/traffic'
import { getKeywords } from '../api/keywords'
import { getTasks } from '../api/tasks'
import type { Metrics } from '../context/ProjectContext'
import type { TrafficPoint } from '../components/ui/TrafficChart'
import type { KeywordValue } from '../components/ui/KeywordsTable'
import type { Task } from "@/api/tasks"
import MetricCard from '../components/ui/MetricCard'
import IndexLineChart from '../components/ui/TrafficChart'
import KeywordsTable from '../components/ui/KeywordsTable'
import DashboardTaskItem from '@/components/ui/DashboardTaskItem'


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

    const { data: keywordsData, isLoading: keywordsIsLoading, isError: keywordsIsError } = useQuery({
        queryKey: ['keywords',activeProject?.id],
        queryFn: () => getKeywords(activeProject!.id),
        enabled: !!activeProject
    })

    const { data: tasksData, isLoading: tasksIsLoading, isError: tasksIsError } = useQuery({
        queryKey: ['tasks',activeProject?.id],
        queryFn: () => getTasks (activeProject!.id),
        enabled: !!activeProject
    })


    if (isLoading || trafficIsLoading || keywordsIsLoading || tasksIsLoading) return <div>Загрузка...</div>
    if (isError || trafficIsError || keywordsIsError || tasksIsError) return <div>Ошибка загрузки</div>
    if(!data || !trafficData || !keywordsData || !tasksData) return null

    const metrics: Metrics = data.data
    const traffic: TrafficPoint[] = trafficData.data
    const keywords: KeywordValue[] = keywordsData.data
    const tasks: Task[] = tasksData.data

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
            <div className="grid gap-4 grid-flow-col">
                <div className="gap-2"><KeywordsTable data = {keywords}/></div>
                <div><DashboardTaskItem tasksData={tasks}/></div>
                <div><DashboardTaskItem tasksData={tasks}/></div>
            </div>
        </>
    )
}