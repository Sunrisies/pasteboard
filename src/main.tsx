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

import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';
import { listen } from '@tauri-apps/api/event';
import { uploadImageApi, useLoginApi } from '@/api/auth'
import { emitter } from '@/utils/mitt'
import { readImageBinary } from 'tauri-plugin-clipboard-api'

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
  const store = (await loadStore())

  try {
    const token = await store.get('token')
    !token && await useLoginApi()
    console.log(token, 'token')

    const ss = await readImageBinary('Blob') as Blob
    if (token) {

      const data = await uploadImageApi(ss, token!)
      await configs(data)
      emitter.emit('add-image', data)
    }
  } catch (e) {
    let permissionGranted = await isPermissionGranted();

    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }

    if (permissionGranted) {
      sendNotification({ title: 'pasteboard', body: '当前剪切板里面没有图片' });
    }
  }
})
// const