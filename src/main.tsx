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
import { useUploadImageApi } from '@/api/auth'
import { emitter } from '@/utils/mitt'
import { onImageUpdate, startListening, readImageBase64, readImageBinary } from 'tauri-plugin-clipboard-api'

import { fetch } from '@tauri-apps/plugin-http';
import { configs, initConfig } from './utils/config';

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

  try {
    // const response1 = await fetch("https://api.chaoyang1024.top/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     "user_name": "chaoyang",
    //     "pass_word": "123456",
    //     "method": "password"
    //   }),
    // })
    // const token = await response1.json().then(res => res.data.access_token)
    // console.log(token, 'token')
    // const ss = await readImageBinary('Blob') as Blob
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
    console.log(data, 'data')
    await configs(data)

    // }
    // console.log(await response.json(), '1=1=1=1=1='); // e.g. "OK"
  } catch (e) {
    console.error(e, '-----')
    // alert("当前剪切板里面没有图片")
  }
})
// const configs = async (image: any) => {
//   const home = BaseDirectory.Home;
//   const path = '.pasteboard/config.json'
//   const a = '.pasteboard'
//   const Exists = await exists(path, {
//     baseDir: home,
//   });
//   console.log(Exists, '算法存在')

//   if (Exists) {
//     const configToml = await readTextFile(path, {
//       baseDir: home,
//     })
//     console.log(configToml, '读取')
//     const config = JSON.parse(configToml)
//     console.log(config, '配置')
//     const newImage = { ...image, id: config.images.length + 1 }
//     config.images = [
//       ...config.images,
//       newImage
//     ]
//     const contents = JSON.stringify(config);
//     const data = await writeTextFile(path, contents, {
//       baseDir: home,
//     });
//     console.log(data, '写入')
//   } else {
//     const tokenExists = await exists(a, {
//       baseDir: home,
//     });
//     console.log(tokenExists, 'tokenExists')
//     if (!tokenExists) {
//       await mkdir(a, {
//         baseDir: home,
//       });

//     }
//     const file = await create(path, { baseDir: home })
//     console.log(file, '创建')
//     const contents = JSON.stringify({ images: [{ ...image, id: 1 }] });
//     await file.write(new TextEncoder().encode(contents));
//     await file.close();

//     // const data = await file.writewriteTextFile(path, contents, {
//     //   baseDir: home,
//     // });
//     console.log(file, '写入')
//   }
// }
