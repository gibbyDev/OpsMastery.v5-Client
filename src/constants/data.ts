import { NavItem } from '@/types';
import { w } from '@faker-js/faker/dist/airline-CLphikKp';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Tickets',
    url: '/dashboard/tickets',
    icon: 'ticket',
    shortcut: ['t', 't'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: 'users',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Calendar',
    url: '/dashboard/calendar',
    icon: 'calendar',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  // {
  //   title: 'Video Chat',
  //   url: '/video-chat-room',
  //   icon: 'media',
  //   shortcut: ['v', 'v'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  {
    title: 'Chat',
    url: '/dashboard/chat',
    icon: 'message',
    shortcut: ['v', 'v'],
    isActive: false,
    items: [] // No child items
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

export type ChatUser = {
  id: string
  username: string
  email: string
  avatar: string
  lastMessageTime?: string
}

export const dummyPartners: ChatUser[] = [
  { id: "1", username: "Alice", email: "alice@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-25T18:41:06.177Z" },
  { id: "2", username: "Bob", email: "bob@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-24T14:21:06.177Z" },
  { id: "3", username: "Charlie", email: "charlie@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-23T10:11:06.177Z" },
  { id: "4", username: "Diana", email: "diana@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-22T09:01:06.177Z" },
  { id: "5", username: "Eve", email: "eve@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-21T08:51:06.177Z" },
  { id: "6", username: "Frank", email: "frank@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-20T07:41:06.177Z" },
  { id: "7", username: "Grace", email: "grace@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-19T06:31:06.177Z" },
  { id: "8", username: "Heidi", email: "heidi@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-18T05:21:06.177Z" },
  { id: "9", username: "Ivan", email: "ivan@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-17T04:11:06.177Z" },
  { id: "10", username: "Judy", email: "judy@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-16T03:01:06.177Z" },
  { id: "11", username: "Karl", email: "karl@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-15T02:51:06.177Z" },
  { id: "12", username: "Laura", email: "laura@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-14T01:41:06.177Z" },
  { id: "13", username: "Mallory", email: "mallory@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-13T00:31:06.177Z" },
  { id: "14", username: "Niaj", email: "niaj@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-12T23:21:06.177Z" },
  { id: "15", username: "Olivia", email: "olivia@example.com", avatar: "/placeholder.svg?height=40&width=40", lastMessageTime: "2025-08-11T22:11:06.177Z" },
]

// Dummy messages for each partner
export const dummyMessages: Record<string, Array<{
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}>> = {
  "1": [
    { id: "1", content: "Hi Alice!", sender: "user", timestamp: new Date(Date.now() - 3600000) },
    { id: "2", content: "Hello! How can I help you?", sender: "assistant", timestamp: new Date(Date.now() - 3500000) },
  ],
  "2": [
    { id: "1", content: "Hey Bob!", sender: "user", timestamp: new Date(Date.now() - 7200000) },
    { id: "2", content: "Hi! What's up?", sender: "assistant", timestamp: new Date(Date.now() - 7100000) },
  ],
  "3": [
    { id: "1", content: "Charlie, are we still meeting tomorrow?", sender: "user", timestamp: new Date(Date.now() - 86400000) },
    { id: "2", content: "Yes, see you at 10am!", sender: "assistant", timestamp: new Date(Date.now() - 86000000) },
  ],
  // ...add more for other users as needed
}
