import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/app/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function Common() {
    return(
        <>
            <div className='flex mx-auto'>
                <aside className='block md:block'>
                    <SidebarProvider>
                        <SideBar />
                        {/* <SidebarTrigger /> */}
                    </SidebarProvider>
                </aside>
                <div className='outlet'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export { Common };