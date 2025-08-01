import { useState, useEffect } from 'react';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export const useMessages = () => {
  const messages = useQuery(api.messages.get);
  const [minimumLoadingTimeReached, setMinimumLoadingTimeReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingTimeReached(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = messages === undefined || !minimumLoadingTimeReached;

  return { messages, isLoading, error: null };
}; 