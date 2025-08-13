import { Layout } from '@/layout'
import { useEffect, useState } from "react"
import { createFileRoute } from '@tanstack/react-router'
import { register, isRegistered, unregister } from '@tauri-apps/plugin-global-shortcut';
import { onImageUpdate, startListening, readImageBase64 } from 'tauri-plugin-clipboard-api'
import { useUploadImageApi } from '@/api/auth'
// import { upload } from ''

export const Route = createFileRoute('/settings')({
    component: RouteComponent,
})

function RouteComponent() {
    const [image, setImage] = useState("")
    // const init = async () => {
    //     const as = await isRegistered("ALT + T")
    //     // const asa = await unregister("ALT + T")
    //     console.log(as, '1=1=1=')
    //     await register('ALT + T', () => {
    //         console.log('Shortcut triggered');
    //     });
    // }
    // const useUploadImage = useUploadImageApi()

    // useEffect(() => {
    // init()
    // })



    return <Layout>
        <div>
            <div className="p-2 border border-red-300 rounded-md">设置</div>
            {image && <img src={image} alt="从剪贴板复制的图片" />}
        </div>
    </Layout>
}
