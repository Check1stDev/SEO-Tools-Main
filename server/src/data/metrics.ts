type Metrics = {
  id: number
  projectId: number
  date: string 
  traffic: number
  positions: number
  leads: number
  conversion: number
}

const metricsData: Metrics[] = [
  {
    id: 1,
    projectId: 1,
    date: '2026-06-01',
    traffic: 12400,
    positions: 14.3,
    leads: 47,
    conversion: 3.8
  },
  {
    id: 2,
    projectId: 2,
    date: '2026-06-01',
    traffic: 8900,
    positions: 22.1,
    leads: 29,
    conversion: 3.2
  },
  {
    id: 3,
    projectId: 3,
    date: '2026-06-01',
    traffic: 15600,
    positions: 9.8,
    leads: 65,
    conversion: 4.1
  }
];

export { metricsData }