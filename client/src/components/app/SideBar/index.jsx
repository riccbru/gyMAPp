import { sidebarItems } from "./sidebarItems";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function SideBar() {
  const navigate = useNavigate();

  return (
    <Sidebar className="sidebar" style={{ width: "10rem" }}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="sidebarMenu">
                <TooltipProvider delayDuration={400}>
                  {sidebarItems.map((item, index) =>
                    item.type !== "menu" ? (
                      <div key={`custom-${index}`}>
                        <item.component />
                      </div>
                    ) : (
                      <Tooltip key={`tooltip-${item.title}`}>
                        <TooltipTrigger asChild>
                          <NavLink to={item.url}>
                            {({ isActive }) => (
                              <SidebarMenuItem
                                className={`sidebarMenuItem ${
                                  isActive ? "!bg-white dark:!bg-gray" : ""
                                }`}
                              >
                                <item.icon />
                              </SidebarMenuItem>
                            )}
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent className="tooltipContent">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    )
                  )}
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
