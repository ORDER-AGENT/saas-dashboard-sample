import { useState, useEffect } from 'react';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export const useUsers = () => {
  const users = useQuery(api.users.get);
  const [minimumLoadingTimeReached, setMinimumLoadingTimeReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingTimeReached(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = users === undefined || !minimumLoadingTimeReached;

  return { users, isLoading, error: null }; // エラーハンドリングはuseQueryがスローするかたちになるため、ここではnullを返します。
};