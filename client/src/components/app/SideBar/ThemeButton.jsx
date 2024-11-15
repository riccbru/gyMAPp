import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from "@/hooks/useDarkMode";
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

function ThemeButton() {
    const [darkTheme, setDarkTheme] = useDarkMode();
  
    const handleClick = () => {
      setDarkTheme(!darkTheme);
    }
  
    return (
      <SidebarMenuItem key={"Theme"}>
        <SidebarMenuButton
          className='rounded-3xl themeButton'
          onClick={handleClick}
        >
          {darkTheme ? <Sun /> : <Moon />}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

export { ThemeButton };