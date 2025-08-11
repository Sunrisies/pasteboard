import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Layout } from '@/layout/index'
export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <Layout>
            <div className="p-2">
                <h3>Welcome Home!</h3>

                <Button >Destructive</Button>
            </div>

        </Layout>

    )
}