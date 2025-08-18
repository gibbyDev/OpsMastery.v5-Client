import AppSidebar from '@/components/layout/app-sidebar';
// import AppTopbar from '@/components/layout/app-topbar'; // If you have a topbar component
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ChatRoom from '@/features/chat/components/ChatRoom';

export default function ChatPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <AppTopbar /> */}
        <div className="flex flex-col h-[calc(100vh-var(--header-height))]">
          <ChatRoom />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}