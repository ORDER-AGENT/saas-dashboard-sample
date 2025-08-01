import { query } from './_generated/server';
import { Message } from '../src/types/messages';

export const get = query({
  handler: async (): Promise<Message[]> => {
    const dummyMessages: Message[] = [
      {
        id: 1,
        name: 'Shelby Goode',
        avatar: 'https://github.com/evilrabbit.png',
        lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
        timestamp: '1 min ago',
        type: 'personal',
        active: false,
      },
      {
        id: 2,
        name: 'Robert Bacins',
        avatar: 'https://github.com/vercel.png',
        lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
        timestamp: '9 min ago',
        type: 'personal',
        active: false,
      },
      {
        id: 3,
        name: 'John Carlio',
        avatar: 'https://github.com/shadcn.png',
        lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
        timestamp: '15 min ago',
        type: 'teams',
        active: true,
        online: true,
      },
      {
        id: 4,
        name: 'Adriene Watson',
        avatar: 'https://github.com/tailwindcss.png',
        lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
        timestamp: '21 min ago',
        type: 'personal',
        active: false,
      },
      {
        id: 5,
        name: 'Jhon Deo',
        avatar: 'https://github.com/reactjs.png',
        lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
        timestamp: '29 min ago',
        type: 'teams',
        active: false,
      },
      {
        id: 6,
        name: 'Mark Ruffalo',
        avatar: 'https://github.com/nextjs.png',
        lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
        timestamp: '45 min ago',
        type: 'teams',
        active: false,
      },
      {
        id: 7,
        name: 'Bethany Jackson',
        avatar: 'https://github.com/nodejs.png',
        lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
        timestamp: '1 hour ago',
        type: 'personal',
        active: false,
      },
    ];
    return dummyMessages;
  },
}); 