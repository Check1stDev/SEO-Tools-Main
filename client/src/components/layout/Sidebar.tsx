import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import {
    ChartNoAxesCombined,
    CheckCheck,
    Toolbox,
    Zap
} from 'lucide-react'
import ProjectSelector from '../ui/ProjectSelector'
import { NavUser } from '@/components/ui/NavUser'

export default function AppSidebar(){
    const location = useLocation()
    const testUser =  {
        name: 'Maksim',
        email: 'admin@ApexSEO.com',
        avatar: ''
  }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Zap />
                            <span>Apex SEO Platform</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                            <ProjectSelector />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === '/'}
                                    >
                                    <Link to="/"><ChartNoAxesCombined /> Дашборд</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === '/tasks'}
                                    >
                                    <Link to="/tasks"><CheckCheck />Задачи</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === '/tools'}
                                    >
                                    <Link to="/tools"><Toolbox />Инструменты</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={testUser}/>
            </SidebarFooter>
        </Sidebar>
        )
}
