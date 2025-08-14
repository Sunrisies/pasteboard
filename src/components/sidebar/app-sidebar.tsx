import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {JSON.stringify(config)}
          <SidebarGroupLabel>工具</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`group relative flex items-center px-3 py-2 text-sm font-medium ${config.sidebar.index === item.index ? 'text-gray-900 bg-gray-200 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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