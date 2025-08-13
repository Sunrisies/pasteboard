import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { listen } from '@tauri-apps/api/event';
import { useUploadImageApi } from '@/api/auth'
import { emitter } from '@/utils/mitt'
import { onImageUpdate, startListening, readImageBase64, readImageBinary } from 'tauri-plugin-clipboard-api'


export const Route = createRootRoute({
    component: () => {
        console.log("--root")
        // emitter.on('foo', e => console.log('foo', e))
        // const useUploadImage = useUploadImageApi()
        // listen("add-images", async (event) => {
        //     console.log(event, '1==1=1=1==')

        //     try {
        //         // emitter.emit('foo', { a: 'b' })
        //         // const base64Img = await readImageBase64()
        //         const ss = await readImageBinary('Blob')
        //         // console.log(base64Img, '==1=1==1', ss)
        //         // const image = `data:image/png;base64, ${base64Img}`
        //         // setImage(image)
        //         await useUploadImage.mutateAsync({
        //             file: ss
        //         })
        //     } catch (e) {
        //         console.error(e, '-----')
        //         // alert("当前剪切板里面没有图片")
        //     }

        //     // .then((base64Img) => {
        //     //   console.log(base64Img, '==1=1==1')
        //     // const image = `data:image/png;base64, ${base64Img}`
        //     // setImage(image)
        // })
        return (
            <>

                <Outlet />
                <TanStackRouterDevtools />
            </>
        )
    }
})