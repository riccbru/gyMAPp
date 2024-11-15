import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/app/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

function Home() {
    return(
        <div>
            <div className='flex min-h-screen'>
                <aside className='block md:block'>
                    <SidebarProvider>
                        <SideBar />
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