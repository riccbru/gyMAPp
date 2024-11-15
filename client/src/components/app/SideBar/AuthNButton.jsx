import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

function AuthNButton(props) {
    const navigate = useNavigate();
    const { isLogged, setIsLogged } = props;
    return(
        <SidebarMenuItem key={"AuthN"}>
            <SidebarMenuButton onClick={() => { setIsLogged(!isLogged); }}>
                <div style={{width: '1.5rem', height: '1.5rem'}}>
                    {!isLogged ? <LogIn /> : <LogOut className='rotate-180'/>}
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

export { AuthNButton };