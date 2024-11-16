import { useNavigate } from "react-router-dom";
import { sidebarItems } from "./sidebarItems";
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


function SideBar() {
    const navigate = useNavigate();

    return(
        <Sidebar className='sidebar' style={{width: '10rem'}}>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <div className='sidebarMenu'>
                    <TooltipProvider>
                      {sidebarItems.map((item, index) => (
                        item.type !== 'menu' ?
                        (
                          <div key={`custom-${index}`} className="sidebarMenuItem">
                            <item.component />
                          </div>
                        )
                        : (
                          <Tooltip key={`tootltip-${item.title}`}>
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
                        )
                      ))}
                    {/* <AuthButton /> */}
                    {/* <ThemeButton /> */}
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