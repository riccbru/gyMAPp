import { sidebarItems } from "./sidebarItems";
import { useNavigate } from "react-router-dom";
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
                    <TooltipProvider delayDuration={400}>
                      {sidebarItems.map((item, index) => (
                        item.type !== 'menu' ?
                        (
                          <div key={`custom-${index}`}>
                            <item.component />
                          </div>
                        )
                        : (
                          <Tooltip key={`tooltip-${item.title}`}>
                            <TooltipTrigger>
                              <SidebarMenuItem className='sidebarMenuItem' key={item.title} onClick={(e) => { navigate(item.url); }}>
                                  <span><item.icon style={{width: '1.5rem', height: '1.5rem'}} /></span>
                              </SidebarMenuItem>
                            </TooltipTrigger>
                            <TooltipContent className='tooltipContent'>
                              {item.title}
                            </TooltipContent>
                          </Tooltip>
                        )
                      ))}
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