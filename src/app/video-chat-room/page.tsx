import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import VideoChatRoom from '../../components/video-chat-room';

export default function VideoChatRoomPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <VideoChatRoom />
      </SidebarInset>
    </SidebarProvider>
  );
}

