'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { allMenuItems } from '@/data/sidebarMenuItems';

const useAuthorization = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    const currentMenuItem = allMenuItems.find(item => item.type === 'item' && item.path === pathname);
    const requiredRoles = currentMenuItem?.roles;

    if (!requiredRoles || requiredRoles.length === 0) {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    if (status === 'unauthenticated') {
      router.push('/admin');
      setIsLoading(false);
      return;
    }

    if (status === 'authenticated') {
      const userRoles = session.user?.roles || [];
      const hasRequiredRole = requiredRoles.some(role =>
        userRoles.includes(role)
      );

      if (hasRequiredRole) {
        setIsAuthorized(true);
      } else {
        router.push('/admin');
      }
      setIsLoading(false);
    }
  }, [session, status, pathname, router]);

  return { isLoading, isAuthorized };
};

export default useAuthorization;