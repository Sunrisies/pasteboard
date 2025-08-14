import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import {
  RouterProvider,
  createRouter
} from '@tanstack/react-router';
import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";

import { routeTree } from './routeTree.gen';
import { writeTextFile, BaseDirectory, exists, create, readTextFile, mkdir } from '@tauri-apps/plugin-fs';


import { listen } from '@tauri-apps/api/event';
import { uploadImageApi, useLoginApi, useUploadImageApi } from '@/api/auth'
import { emitter } from '@/utils/mitt'
import { onImageUpdate, startListening, readImageBase64, readImageBinary } from 'tauri-plugin-clipboard-api'

import { fetch } from '@tauri-apps/plugin-http';
import { configs, initConfig } from './utils/config';
import { loadStore } from './store';

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
initConfig()
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);


listen("add-images", async (event) => {
  console.log(event, '1==1=1111=1121==')
  const store = (await loadStore())

  try {
    const token = await store.get('token')
    !token && await useLoginApi()
    console.log(token, 'token')

    const ss = await readImageBinary('Blob') as Blob
    // const formData = new FormData()
    // formData.append('file', new Blob([ss], { type: 'image/png' }), 'image.png');
    // const response = await fetch('https://api.chaoyang1024.top/api/storage', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Authorization: token ? `Bearer ${token}` : ''
    //   }
    // });
    // const { code, message, data } = await response.json()
    // if (code === 200) {
    const data = {
      "path": "https://vip.chaoyang1024.top/uploads/2025/8/14/image.png",
      "title": "image.png",
      "size": "104 KB",
      "type": "image/png",
      "created_at": "2025-08-14T01:33:41.361Z",
      "storage_provider": "qiniu",
      "id": 50
    }
    if (token) {

      const data = await uploadImageApi(ss, token!)
      await configs(data)
      emitter.emit('add-image', data)
    }
  } catch (e) {
    console.error(e, '-----')
    // alert("当前剪切板里面没有图片")
  }
})
// const