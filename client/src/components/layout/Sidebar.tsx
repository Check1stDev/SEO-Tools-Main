import { Link, useLocation } from "react-router-dom"

export default function Sidebar(){
    const location = useLocation()

    
    const getLinkClass = (pathname:string) => {
        return pathname === location.pathname? 'font-bold text-blue-600' : 'text-gray-600'
    }
    return (<aside>
        <Link className={getLinkClass('/tasks')} to="/tasks">Задачи</Link>
        <Link className={getLinkClass('/')}to="/">Дашборд</Link>
        <Link className={getLinkClass('/tools')}to='/tools'>Инструменты</Link>
    </aside>)
}