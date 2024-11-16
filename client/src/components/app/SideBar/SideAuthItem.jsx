import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { 
Tooltip, 
TooltipContent, 
TooltipTrigger
} from '@/components/ui/tooltip';

function SideAuthItem() {
    const navigate = useNavigate();
    const { isLogged, logout } = useAuth();

    const handleClick = () => {
      if (isLogged) { logout(); }
      else { navigate("/login");
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
          <TooltipContent className="tooltipContent">
            {!isLogged ? "Log in" : "Log out"}
          </TooltipContent>
        </Tooltip>
    );
}

export { SideAuthItem };