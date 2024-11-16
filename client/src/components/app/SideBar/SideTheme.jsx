import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from "@/hooks/useDarkMode";
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

function SideTheme() {
    const [darkTheme, setDarkTheme] = useDarkMode();
  
    const handleClick = () => {
      setDarkTheme(!darkTheme);
    }
  
    return (
      <SidebarMenuItem>
          <SidebarMenuButton
            className='rounded-3xl themeButton'
            onClick={handleClick}
          >
            <span>{darkTheme ? <Sun /> : <Moon />}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

export { SideTheme };