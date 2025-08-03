import { FaFigma, FaGithub } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi2';
import { IoNotifications } from 'react-icons/io5';
import { PiLockKeyOpenFill } from 'react-icons/pi';
import { RiCalendarScheduleFill, RiDashboardHorizontalFill, RiSettings5Fill } from 'react-icons/ri';
import { BsChatDotsFill } from 'react-icons/bs';
import { SidebarMenuItemType } from '@/types/sidebar';

export const allMenuItems: SidebarMenuItemType[] = [
  {
    type: 'item',
    key: 'dashboard',
    icon: RiDashboardHorizontalFill,
    text: 'ダッシュボード',
    path: '/',
    displayInFooter: true,
  },
  {
    type: 'item',
    key: 'schedule',
    icon: RiCalendarScheduleFill,
    text: 'スケジュール',
    path: '/schedule',
    displayInFooter: true,
  },
  {
    type: 'item',
    key: 'users',
    icon: HiUsers,
    text: 'ユーザー',
    path: '/users',
    displayInFooter: true,
  },
  {
    type: 'item',
    key: 'secret',
    icon: PiLockKeyOpenFill,
    text: 'シークレット',
    path: '/secret',
    roles: ['admin'],
    displayInFooter: false,
  },
  {
    type: 'item',
    key: 'messages',
    icon: BsChatDotsFill,
    text: 'メッセージ',
    path: '/messages',
    displayInFooter: true,
  },
  {
    type: 'item',
    key: 'notification',
    icon: IoNotifications,
    text: '通知',
    path: '/notification',
    displayInFooter: true,
  },
  {
    type: 'item',
    key: 'settings',
    icon: RiSettings5Fill,
    text: '設定',
    path: '/settings',
    displayInFooter: false,
  },
  {
    type: 'divider',
    key: 'external-divider',
  },
  {
    type: 'item',
    key: 'github',
    icon: FaGithub,
    text: 'GitHub',
    path: 'https://github.com/ORDER-AGENT/saas-dashboard-sample',
    displayInFooter: false,
    isExternal: true,
  },
  {
    type: 'item',
    key: 'figma',
    icon: FaFigma,
    text: 'Figma',
    path: 'https://www.figma.com/community/file/1065510379888107603',
    displayInFooter: false,
    isExternal: true,
  },
];

export const getSidebarMenuItems = (userRoles: string[]): SidebarMenuItemType[] => {
  // ユーザーのロールに基づいてメニュー項目をフィルタリング
  return allMenuItems.filter(item => {
    // ロールが設定されていない、または空配列の場合は常に表示
    if (!item.roles || item.roles.length === 0) {
      return true;
    }
    // ユーザーのロールとメニュー項目のロールのいずれかが一致すれば表示
    return item.roles.some(role => userRoles.includes(role));
  });
};