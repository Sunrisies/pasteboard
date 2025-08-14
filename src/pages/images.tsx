import { createFileRoute } from '@tanstack/react-router'
import { getConfig } from '@/utils/config'
import { Divide } from 'lucide-react'
import { Layout } from '@/layout'
import { useEffect, useState } from 'react'
export const Route = createFileRoute('/images')({
    component: RouteComponent,
})

function RouteComponent() {
    // console.log(getConfig(), 'getConfig')
    const [config, setConfig] = useState({})

    useEffect(() => {
        getConfig().then(res => {
            console.log(res, 'res')
            // setConfig(res)
        })
    }, [config])
    return (
        <Layout>
            <div>21211212 </div>
        </Layout>

    )
}
