import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, setActiveIndex } from '@/store/config'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "@tanstack/react-router"
import { use, useState } from "react"

// Menu items.
const items = [
  {
    title: "首页",
    url: "/",
    icon: Home,
    index: 0
  },
  {
    title: "记录",
    url: "/images",
    icon: Search,
    index: 1
  },
  {
    title: "设置",
    url: "/settings",
    icon: Settings,
    index: 2
  },
  {
    title: "关于",
    url: "/about",
    icon: Calendar,
    index: 3
  },
]

export function AppSidebar({ config }: { config: any }) {
  const navigate = useNavigate()
  // const [activeIndex, setActiveIndex] = useState(config.sidebar.index || 0)
  const activeIndex = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const handleGotoPage = (e: any) => {
    navigate({ to: e.url })
    dispatch(setActiveIndex(e.index))
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>工具{activeIndex}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.sidebar && items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild
                    className={`group relative flex items-center px-3 py-2 text-sm font-medium ${activeIndex === item.index ? 'text-gray-900 bg-gray-200 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {/* <Link>
                      
                    </Link> */}
                    <div onClick={() => handleGotoPage(item)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}