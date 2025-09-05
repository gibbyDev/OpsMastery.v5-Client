"use client"

import PageContainer from '@/components/layout/page-container'
import CalendarSidebar from '@/features/calendar/components/CalendarSidebar'
import React, { useState } from 'react'

type CalendarEvent = {
  id: string
  title: string
  date: string
  description?: string
}

const dummyEvents: CalendarEvent[] = [
  { id: '1', title: 'Team Meeting', date: '2025-09-05', description: 'Discuss project updates' },
  { id: '2', title: 'Release Day', date: '2025-09-10', description: 'OpsMastery v5 launch' },
  { id: '3', title: '1:1 with Cody', date: '2025-09-12' },
  { id: '4', title: 'Sprint Planning', date: '2025-09-15', description: 'Plan next sprint tasks' },
  { id: '5', title: 'Demo Day', date: '2025-09-20', description: 'Showcase new features' },
]

const Page = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  return (
    <PageContainer scrollable>
      <div className="flex flex-1 min-h-0">
        {/* Calendar Sidebar */}
        <CalendarSidebar events={dummyEvents} onSelectEvent={handleSelectEvent} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {selectedEvent ? (
            <div className="p-4">
              <h2 className="font-semibold">{selectedEvent.title}</h2>
              <p className="text-sm text-muted-foreground">{selectedEvent.date}</p>
              {selectedEvent.description && <p>{selectedEvent.description}</p>}
            </div>
          ) : (
            <div className="p-4 text-muted-foreground">Select an event to see details.</div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

export default Page