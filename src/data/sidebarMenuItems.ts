import { IconType } from 'react-icons';
import { RiDashboardHorizontalFill, RiSettings5Fill, RiCalendarScheduleFill } from 'react-icons/ri';
import { PiLockKeyOpenFill } from 'react-icons/pi';
import { HiUsers } from 'react-icons/hi2';
//import { GrSchedules } from 'react-icons/gr';
import { IoNotifications } from 'react-icons/io5'; // IoNotificationsをインポート
import { BsChatDotsFill } from 'react-icons/bs'; // BsChatDotsFillをインポート

export interface SidebarMenuItemType {
  key: string;
  icon: IconType;
  text: string;
  path: string;
  isDynamic: boolean;
  roles?: string[];
}

export const getSidebarMenuItems = (userRoles: string[]): SidebarMenuItemType[] => {
  const allMenuItems: SidebarMenuItemType[] = [
    {
      key: 'dashboard',
      icon: RiDashboardHorizontalFill,
      text: 'ダッシュボード',
      path: '/',
      isDynamic: false,
    },
    {
      key: 'Schedule',
      icon: RiCalendarScheduleFill,
      text: 'スケジュール',
      path: '/Schedule',
      isDynamic: false,
    },
    {
      key: 'users',
      icon: HiUsers,
      text: 'ユーザー',
      path: '/users',
      isDynamic: false,
    },
    {
      key: 'secret',
      icon: PiLockKeyOpenFill,
      text: 'シークレット',
      path: '/secret',
      isDynamic: false,
      roles: ['admin']
    },
    {
      key: 'messages',
      icon: BsChatDotsFill,
      text: 'メッセージ',
      path: '/messages',
      isDynamic: false,
    },
    {
      key: 'notification',
      icon: IoNotifications,
      text: '通知',
      path: '/notification',
      isDynamic: false,
    },
    {
      key: 'settings',
      icon: RiSettings5Fill,
      text: '設定',
      path: '/settings',
      isDynamic: false,
    },
  ];

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