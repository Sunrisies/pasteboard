import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: About,
})

function About() {
    return <div className="p-2 border border-red-300 rounded-md">Hello from About!</div>
}