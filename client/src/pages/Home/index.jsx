import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/app/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

function Home(props) {
    const { isLogged, setIsLogged } = props;
    return(
        <div>
            <div className='flex h-screen w-screen'>
                <aside className='block md:block'>
                    <SidebarProvider>
                        <SideBar isLogged={isLogged} setIsLogged={setIsLogged}/>
                        {/* <SidebarTrigger /> */}
                    </SidebarProvider>
                </aside>
            </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
        </div>
    );
}

export { Home };