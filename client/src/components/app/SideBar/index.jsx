import { useState } from 'react';
import { ThemeButton } from "./ThemeButton";
import { AuthNButton } from "./AuthNButton";
import { useNavigate } from "react-router-dom";
import { Calendar, ChartNoAxesCombined, Dumbbell, Home, Settings, Utensils } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Meals",
    url: "/meals",
    icon: Utensils,
  },
  {
    title: "Workouts",
    url: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Progress",
    url: "/progresses",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

function SideBar(props) {
    const navigate = useNavigate();
    const { isLogged, setIsLogged } = props;
    return(
        <Sidebar className='sidebar' style={{width: '10rem'}}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <div className='sidebarMenu'>
                {items.map((item) => (
                  <SidebarMenuItem className='sidebarMenuItem' key={item.title}>
                    <SidebarMenuButton onClick={(e) => { navigate(item.url); }}>
                        <item.icon style={{width: '1.5rem', height: '1.5rem'}} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <AuthNButton isLogged={isLogged} setIsLogged={setIsLogged}/>
                <ThemeButton />
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
}

export { SideBar };