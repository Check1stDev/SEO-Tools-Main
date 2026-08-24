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
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar"
import {
    ChartNoAxesCombined,
    CheckCheck,
    Toolbox,
    Zap,
    Tags 
} from 'lucide-react'
import ProjectSelector from '../ui/ProjectSelector'
import { NavUser } from '@/components/ui/NavUser'
import myLogo from '@/assets/Logo.png';

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
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                <img 
                                    src={myLogo} 
                                    alt="Логотип" 
                                    className="size-30 object-contain" 
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Apex SEO</span>
                                <span className="truncate text-xs">Platform</span>
                                </div>
                            </a>
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
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton 
                                                    asChild 
                                                    isActive={location.pathname === '/tools/meta-tags'}
                                                >
                                                    <Link to="/tools/meta-tags">
                                                        <Tags />
                                                        <span>Мета-теги</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton 
                                                    asChild 
                                                    isActive={location.pathname === '/tools/key-text-check'}
                                                >
                                                    <Link to="/tools/key-text-check">
                                                        <Zap />
                                                        <span>Проверка ключей</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
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
