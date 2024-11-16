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
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


function SideBar() {
    const navigate = useNavigate();

    // return(
    //   <Sidebar className='sidebar' style={{width: '10rem'}}>
    //     <SidebarContent>
    //       <SidebarGroup>
    //         <SidebarGroupLabel>TEST SIDEBAR</SidebarGroupLabel>
    //         <SidebarGroupContent>
    //           <SidebarMenu>
    //             <div className='sidebarMenu'>
    //               {sidebarItems.map((item) => (
    //                 <SidebarMenuItem className='sidebarMenuItem' key={item.title}>
    //                   <SidebarMenuButton onClick={(e) => { navigate(item.url); }}>
    //                     <a href={item.url}>
    //                       <item.icon />
    //                       {/* <span>{item.title}</span> */}
    //                     </a>
    //                   </SidebarMenuButton>
    //                 </SidebarMenuItem>
    //               ))}
    //             </div>
    //           </SidebarMenu>
    //         </SidebarGroupContent>
    //       </SidebarGroup>
    //     </SidebarContent>
    //   </Sidebar>
    // );

    return(
        <Sidebar className='sidebar' style={{width: '10rem'}}>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <div className='sidebarMenu'>
                    <TooltipProvider delayDuration={150}>
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
                            <TooltipContent className='tooltipContent rounded-full'>
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