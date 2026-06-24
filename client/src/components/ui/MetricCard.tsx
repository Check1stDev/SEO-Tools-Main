type MetricCardProps = { 
    name: string 
    value:number
 }

export default function MetricCard({name, value}: MetricCardProps){
    return(
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 w-64">
            <h3 className="text-sm font-medium text-gray-500">{name}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
            </div>
        </div>
    )

}