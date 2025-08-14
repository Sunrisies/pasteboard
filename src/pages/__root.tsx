import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { listen } from '@tauri-apps/api/event';
import { useUploadImageApi } from '@/api/auth'
import { emitter } from '@/utils/mitt'
import { onImageUpdate, startListening, readImageBase64, readImageBinary } from 'tauri-plugin-clipboard-api'

import { fetch } from '@tauri-apps/plugin-http';
export const Route = createRootRoute({
    component: () => {
        console.log("--root")
        // emitter.on('foo', e => console.log('foo', e))
        // const useUploadImage = useUploadImageApi()

        return (
            <>

                <Outlet />
                <TanStackRouterDevtools />
            </>
        )
    }
})