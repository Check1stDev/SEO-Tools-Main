import type { ReactNode } from "react";
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import {ProjectProvider} from '../../context/ProjectProvider'


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
   return (
   <ProjectProvider>
        <div>
            < Header />
            <div>
                <Sidebar />
                {children}
            </div>
            < Footer />
        </div>
    </ProjectProvider>
    )}


export default Layout