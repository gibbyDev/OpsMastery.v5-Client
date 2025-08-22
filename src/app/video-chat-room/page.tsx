import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import VideoChat from '../../features/video-chat-room/components/video-chat-room';

export default function VideoChatRoomPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <VideoChat />
      </SidebarInset>
    </SidebarProvider>
  );
}

