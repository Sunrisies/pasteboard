import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { loadStore } from "@/store"
import { useEffect, useState } from "react"
import { Store } from "@tauri-apps/plugin-store"
import { getConfig, saveConfig } from "@/utils/config"
// import { emitter } from '@/utils/mitt'
export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<any>({})
    const [isEnabled, setIsEnabled] = useState(false)
    useEffect(() => {
        getConfig().then(config => {
            console.log(config, '2112211')
            const newConfig = {
                ...config, sidebar: { index: 0 }
            }
            saveConfig(newConfig)
            setConfig(newConfig)
            setIsEnabled(true)
        })

    }, [])
    return (
        <>
            {isEnabled && <SidebarProvider>
                <AppSidebar config={config} />
                <main>
                    {children}
                </main>
            </SidebarProvider>}

        </>

    )
}