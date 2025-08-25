import { useQuery, useMutation } from '@tanstack/react-query'
import { request } from '@/utils/request'
import { writeTextFile, BaseDirectory, exists, create, readTextFile } from '@tauri-apps/plugin-fs';
import { loadStore } from '@/store/index'
import { fetch } from '@tauri-apps/plugin-http';
//添加写入文件的权限

export const useUploadImageApi = () => {
    return useMutation({
        mutationFn: async (params: any) => {
            const formData = new FormData()
            console.log(params.file, '======')
            formData.append('file', new Blob([params.file], { type: 'image/png' }), 'image.png');
            // formData.append('file', params.file, "22121.png")
            // const { data, code, message } = await request.upload('/storage', formData);
            // console.log(data, code, message);
            // if (code === 200) {
            console.log('123213123')
            const Exists = await exists('config.json', {
                baseDir: BaseDirectory.Config,
            });
            console.log(Exists, '算法存在')
            if (Exists) {
                const configToml = await readTextFile('config.json', {
                    baseDir: BaseDirectory.Config,
                })
                console.log(configToml, '读取')
                const config = JSON.parse(configToml)
                console.log(config, '配置')
                const image = {
                    name: "image.png",
                    path: Math.random().toString(36).substr(2, 10) + ".png",
                }
                config.images = [
                    ...config.images,
                    image
                ]
                const contents = JSON.stringify(config);
                const data = await writeTextFile('config.json', contents, {
                    baseDir: BaseDirectory.Config,
                });
                console.log(data, '写入')
            } else {
                const file = await create('config.json', { baseDir: BaseDirectory.Config })
                console.log(file, '创建')
                const contents = JSON.stringify({ notifications: true });
                const data = await writeTextFile('config.json', contents, {
                    baseDir: BaseDirectory.Config,
                });
                console.log(data, '写入')
            }

            // }

            // if (code === 200) {
            //     sessionStorage.setItem('token', data.access_token);
            //     toast.success(message || "登录成功");
            //     navigate({ to: "/dashboard" });
            // }
        },
    });
}
export const useLoginApi = async () => {
    const store = (await loadStore())
    console.log('useLoginApi', store)
    const response = await fetch("https://api.chaoyang1024.top/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_name": "chaoyang",
            "pass_word": "123456",
            "method": "password"
        }),
    })
    console.log(response, '==========')
    const token = await response.json().then(res => res.data.access_token)
    console.log(token, 'token')
    await store.set('token', token)
    return token
}

export const uploadImageApi = async (file: Blob, token: string) => {
    return await new Promise(async (resolve, reject) => {
        const formData = new FormData()
        formData.append('file', new Blob([file], { type: 'image/png' }), 'image.png');
        const response = await fetch('https://api.chaoyang1024.top/api/storage', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        });
        const { code, message, data } = await response.json()
        console.log(code, 'dta', data)
        if (code === 200) {
            resolve(data)
        } else if (code === 401) {
            const token = await useLoginApi()
            await uploadImageApi(file, token)
        }
        reject('失败')
    })
}