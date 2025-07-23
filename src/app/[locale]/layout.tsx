import { AppSidebar } from '@/components/layout/Sidebar'

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from '@/components/layout/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header/>
    
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
