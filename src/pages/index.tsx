import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Layout } from '@/layout/index'
export const Route = createFileRoute('/')({
    component: Index,
})

/**
 * Index函数组件
 * 作为首页的主要展示组件
 * @returns 返回一个包含欢迎信息和按钮的布局组件
 */
function Index() {
    return (
        <Layout>
            {/* 使用p-2类设置内边距的容器 */}
            <div className="p-2">
                {/* 欢迎标题 */}
                <h3>Welcome Home!</h3>

                {/* 普通按钮组件 */}
                <Button >Destructive</Button>
            </div>

        </Layout>

    )
}