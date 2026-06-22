import { ReactNode } from "react";
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
   return (<div>
        < Header />
        <div>
            <Sidebar />
            {children}
        </div>
        < Footer />
    </div>

    )}


export default Layout