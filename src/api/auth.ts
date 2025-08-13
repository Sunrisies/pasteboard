import { useQuery, useMutation } from '@tanstack/react-query'
import { request } from '@/utils/request'
import { writeTextFile, BaseDirectory, exists, create } from '@tauri-apps/plugin-fs';
//添加写入文件的权限
const upLoad = () => {

}
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
                const contents = JSON.stringify({ notifications: true });
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