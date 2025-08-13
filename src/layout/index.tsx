import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
// import { emitter } from '@/utils/mitt'
export const Layout = ({ children }: { children: React.ReactNode }) => {

    return (<SidebarProvider>
        <AppSidebar />
        <main>
            {children}
        </main>
    </SidebarProvider>)
}