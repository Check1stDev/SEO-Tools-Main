import type { ReactNode } from "react";
import Header from './Header'
import Footer from './Footer'
import {ProjectProvider} from '../../context/ProjectProvider'
import AppSidebar from "./Sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
   return (
   <ProjectProvider>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                {children}
            </SidebarInset>
        </SidebarProvider>
    </ProjectProvider>
    )}


export default Layout