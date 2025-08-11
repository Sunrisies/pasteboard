import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/layout/index'
export const Route = createFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <Layout>
            <div>

                <div className="p-2 border border-red-300 rounded-md">Hello from About!</div>
            </div>
        </Layout>


    )
}