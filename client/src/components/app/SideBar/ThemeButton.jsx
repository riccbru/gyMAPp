import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from "@/hooks/useDarkMode";
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function ThemeButton() {
    const [darkTheme, setDarkTheme] = useDarkMode();
  
    const handleClick = () => {
      setDarkTheme(!darkTheme);
    }
  
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <SidebarMenuItem key={"Theme"}>
              <SidebarMenuButton
                className='rounded-3xl themeButton'
                onClick={handleClick}
              >
                {darkTheme ? <Sun /> : <Moon />}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </TooltipTrigger>
          <TooltipContent className='bg-primary text-white dark:bg-white dark:text-primary rounded-full'>
            {darkTheme ? "Light" : "Dark"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

export { ThemeButton };