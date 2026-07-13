import type { ReactNode } from "react";
import Header from './Header'
import Footer from './Footer'
import {ProjectProvider} from '../../context/ProjectProvider'
import AppSidebar from "./Sidebar";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
   return (
   <ProjectProvider>
            < Header />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    Проверка контента
                    {children}
                </SidebarInset>
            </SidebarProvider>
            < Footer />
    </ProjectProvider>
    )}


export default Layout