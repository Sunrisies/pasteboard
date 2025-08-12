import { Layout } from '@/layout'
import { useEffect, useState } from "react"
import { createFileRoute } from '@tanstack/react-router'
import { register, isRegistered, unregister } from '@tauri-apps/plugin-global-shortcut';
import { onImageUpdate, startListening, readImageBase64 } from 'tauri-plugin-clipboard-api'
import { upload } from '@tauri-apps/plugin-upload';
import { listen } from '@tauri-apps/api/event';
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
    useEffect(() => {
        // init()
        ls()
    })
    const ls = () => {
        listen("add-images", async (event) => {
            console.log(event, '1==1=1=1==')
            try {
                const base64Img = await readImageBase64()
                console.log(base64Img, '==1=1==1')
                const image = `data:image/png;base64, ${base64Img}`
                setImage(image)
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInVzZXJuYW1lIjoi6JaE5by6Iiwicm9sZSI6InVzZXIiLCJwZXJtaXNzaW9ucyI6NTIzLCJpYXQiOjE3NTM5MjkxMTksImV4cCI6MTc1MzkzMjcxOX0.U_nRBDEI8K3Tyo1GpgicTcrdHg2P980dZJMKkIAlv9g");
                myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
                myHeaders.append("Accept", "*/*");
                myHeaders.append("Host", "api.chaoyang1024.top");
                myHeaders.append("Connection", "keep-alive");

                var formdata = new FormData();

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                fetch("https://api.chaoyang1024.top/api/storage", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                // upload(
                //     'https://example.com/file-upload',
                //     'D:\project\project\tauri\pasteboard\src\pages\about.tsx',
                //     ({ progress, total }) =>
                //         console.log(`Uploaded ${progress} of ${total} bytes`), // a callback that will be called with the upload progress
                //     { 'Content-Type': 'text/plain' } // optional headers to send with the request
                // );
            } catch (e) {
                alert("当前剪切板里面没有图片")
            }

            // .then((base64Img) => {
            //   console.log(base64Img, '==1=1==1')
            // const image = `data:image/png;base64, ${base64Img}`
            // setImage(image)
        })
    }

    return <Layout>
        <div>
            <div className="p-2 border border-red-300 rounded-md">设置</div>
            {image && <img src={image} alt="从剪贴板复制的图片" />}
        </div>
    </Layout>
}
