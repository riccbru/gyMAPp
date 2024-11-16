import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from "@/hooks/useDarkMode";
import { SidebarMenuItem } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

function SideThemeItem() {
    const [darkTheme, setDarkTheme] = useDarkMode();
  
    const handleClick = () => {
      setDarkTheme(!darkTheme);
    }
  
    return (
      <Tooltip key={"tooltip-Theme"}>
        <TooltipTrigger>
          <SidebarMenuItem
            key={"Theme"}
            onClick={handleClick}
            className="sidebarTheme"
          > 
              <span>{darkTheme ? <Sun /> : <Moon />}</span>
          </SidebarMenuItem>
        </TooltipTrigger>
        <TooltipContent className="tooltipContent">
          {darkTheme ? "Light theme" : "Dark theme"}
        </TooltipContent>
      </Tooltip>
    );
  }

export { SideThemeItem };