export interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  date: string;
  status: 'Complete' | 'Pending' | 'Cancel';
  starred: boolean;
  checked: boolean;
} 