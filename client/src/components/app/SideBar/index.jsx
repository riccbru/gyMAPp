import { AuthButton } from "./AuthButton";
import { ThemeButton } from "./ThemeButton";
import { useNavigate } from "react-router-dom";
import { Calendar, ChartNoAxesCombined, Dumbbell, Home, Settings, Utensils } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
];

function SideBar() {
    const navigate = useNavigate();

    return(
        <Sidebar className='sidebar' style={{width: '10rem'}}>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <div className='sidebarMenu'>
                    <TooltipProvider delayDuration={0}>
                      {items.map((item) => (
                        <Tooltip key={`tootltip${item.title}`}>
                          <TooltipTrigger>
                            <SidebarMenuItem className='sidebarMenuItem' key={item.title}>
                              <SidebarMenuButton onClick={(e) => { navigate(item.url); }}>
                                <span><item.icon style={{width: '1.5rem', height: '1.5rem'}} /></span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </TooltipTrigger>
                          <TooltipContent className='tooltipContent rounded-full'>
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                      <AuthButton />
                      <ThemeButton />
                    </TooltipProvider>
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
}

export { SideBar };