"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { IconCalendar } from "@tabler/icons-react"

type CalendarEvent = {
  id: string
  title: string
  date: string
  description?: string
}

type CalendarSidebarProps = {
  events: CalendarEvent[]
  onSelectEvent?: (event: CalendarEvent) => void
}

export default function CalendarSidebar({
  events,
  onSelectEvent,
}: CalendarSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sidebar
      collapsible="icon"
      className="h-full min-h-0"
      variant="sidebar"
      side="left"
    >
      <SidebarHeader>
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold flex items-center gap-2">
            <IconCalendar size={20} />
            Calendar
          </span>
          <SidebarTrigger
            className="ml-auto"
            onClick={() => setCollapsed((c) => !c)}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Events</SidebarGroupLabel>
          <SidebarMenu>
            {events.length > 0 ? (
              events.map((event) => (
                <SidebarMenuItem key={event.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectEvent?.(event)}
                    className="w-full text-left"
                  >
                    <div>
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {event.date}
                      </div>
                      {event.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {event.description}
                        </div>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <div className="text-muted-foreground py-8 text-center text-sm">
                No events found
              </div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}