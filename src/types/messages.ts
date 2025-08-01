export interface Message {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  type: 'personal' | 'teams';
  active: boolean;
  online?: boolean;
} 