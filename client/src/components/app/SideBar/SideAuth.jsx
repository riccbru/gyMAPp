import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';

function SideAuth() {
    const navigate = useNavigate();
    const { isLogged, logout } = useAuth();

    const handleClick = () => {
      if (isLogged) {
        logout();
      } else {
        navigate("/login");
      }
    };

    return (
        <Tooltip key={"tooltipAuth"}>
          <TooltipTrigger>
            <SidebarMenuItem key={"AuthN"}>
              <SidebarMenuButton
                className="rounded-3xl authButton
                  transition-all duration-200
                  ease-linear cursor-pointer"
                onClick={handleClick}
              >
                <span style={{ display: "inline-block", width: "1.5rem", height: "1.5rem" }}>
                  {!isLogged ? <LogIn /> : <LogOut className="rotate-180" />}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </TooltipTrigger>
          <TooltipContent className="tooltipContent rounded-full">
            {!isLogged ? "Log in" : "Log out"}
          </TooltipContent>
        </Tooltip>
    );
}

export { SideAuth };