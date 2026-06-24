type TrafficPoint = {
    projectId: number
    period: string
    traffic: number
}

const trafficData: TrafficPoint[] = 
[ 
    { projectId: 1, period: 'Январь', traffic: 1200 },
    { projectId: 1, period: 'Февраль', traffic: 1500 },
    { projectId: 1, period: 'Март', traffic: 1800 },
    { projectId: 1, period: 'Апрель', traffic: 1600 },
    { projectId: 1, period: 'Май', traffic: 2100 },
    { projectId: 1, period: 'Июнь', traffic: 2400 },

    { projectId: 2, period: 'Январь', traffic: 3000 },
    { projectId: 2, period: 'Февраль', traffic: 3200 },
    { projectId: 2, period: 'Март', traffic: 2800 },
    { projectId: 2, period: 'Апрель', traffic: 3500 },
    { projectId: 2, period: 'Май', traffic: 4000 },
    { projectId: 2, period: 'Июнь', traffic: 3800 },
    
    { projectId: 3, period: 'Январь', traffic: 500 },
    { projectId: 3, period: 'Февраль', traffic: 700 },
    { projectId: 3, period: 'Март', traffic: 900 },
    { projectId: 3, period: 'Апрель', traffic: 1200 },
    { projectId: 3, period: 'Май', traffic: 1500 },
    { projectId: 3, period: 'Июнь', traffic: 1900 },
]

export { trafficData }