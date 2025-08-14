import { createFileRoute } from '@tanstack/react-router'
import { getConfig } from '@/utils/config'
import { Divide } from 'lucide-react'
import { Layout } from '@/layout'
import { useEffect, useState } from 'react'
import { emitter } from '@/utils/mitt'
export const Route = createFileRoute('/images')({
    component: RouteComponent,
})
interface Image {
    id: number;
    path: string;
    title: string;
}

function RouteComponent() {
    // console.log(getConfig(), 'getConfig')
    const [images, setImages] = useState<Image[]>([])
    emitter.on('add-image', () => {
        console.log("2211212")
        getConfig().then(res => {
            const a = res.images.map(image => ({
                ...image,
                path: image.path.replace('https', 'http')
            }))
            setImages(a)
        })
        emitter.off('add-image')
    })
    useEffect(() => {
        getConfig().then(res => {
            console.log(res, 'res')
            const a = res.images.map(image => ({
                ...image,
                path: image.path.replace('https', 'http')
            }))
            setImages(a)
        })
    }, [])
    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">图片列表</h1>
                <div>已经上传{images.length}张图片</div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {images.length !== 0 && images.map((image) => (
                        <div key={image.id} className="border p-4 bg-white shadow-md">
                            <img src={image.path} alt={image.title} className="w-full h-auto" />
                            <p className="mt-2 text-sm text-gray-600">{image.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>

    )
}
