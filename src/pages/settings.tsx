import { Layout } from '@/layout'
import { useEffect } from "react"
import { createFileRoute } from '@tanstack/react-router'
import { register, isRegistered, unregister } from '@tauri-apps/plugin-global-shortcut';
import { listen } from '@tauri-apps/api/event';
export const Route = createFileRoute('/settings')({
    component: RouteComponent,
})

function RouteComponent() {
    const init = async () => {
        const as = await isRegistered("ALT + T")
        // const asa = await unregister("ALT + T")
        console.log(as, '1=1=1=')
        await register('ALT + T', () => {
            console.log('Shortcut triggered');
        });
    }
    useEffect(() => {
        init()
        ls()
    })
    const ls = () => {
        listen("add-images", async (event) => {
            console.log(event, '1==1=1=1==')
        })
    }

    return <Layout>
        <div>
            <div className="p-2 border border-red-300 rounded-md">设置</div>
        </div>
    </Layout>
}
