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
          className="justify-center bg-primary dark:bg-white text-white dark:text-background rounded-3xl hover:bg-background hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer"
          onClick={handleClick}
        >
          {darkTheme ? <Sun /> : <Moon />}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

export { ThemeButton };