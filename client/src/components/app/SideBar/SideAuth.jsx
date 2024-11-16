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
        <Tooltip key={"tooltip-AuthN"}>
          <TooltipTrigger>
            <SidebarMenuItem
              key={"AuthN"}
              onClick={handleClick}
              className="sidebarMenuItem"
            >
              <span>{!isLogged ? <LogIn /> : <LogOut className="rotate-180" />}</span>
            </SidebarMenuItem>
          </TooltipTrigger>
          <TooltipContent className="tooltipContent rounded-full">
            {!isLogged ? "Log in" : "Log out"}
          </TooltipContent>
        </Tooltip>
    );
}

export { SideAuth };