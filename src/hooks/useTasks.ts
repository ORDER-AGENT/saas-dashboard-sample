import { useState, useEffect } from 'react';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export const useTasks = () => {
  // convex/tasks.ts の get クエリを使用してタスクデータを取得します。
  const tasks = useQuery(api.tasks.get);
  const [minimumLoadingTimeReached, setMinimumLoadingTimeReached] = useState(false);

  useEffect(() => {
    // ローディング状態をシミュレートするために1秒後にタイマーをセットします。
    const timer = setTimeout(() => {
      setMinimumLoadingTimeReached(true);
    }, 1000);

    // クリーンアップ関数でタイマーをクリアします。
    return () => clearTimeout(timer);
  }, []);

  // tasks が undefined であるか、最小ローディング時間が経過していない場合にローディング中と判断します。
  const isLoading = tasks === undefined || !minimumLoadingTimeReached;

  // タスクデータ、ローディング状態、エラー（ここではnull）を返します。
  // useQuery がエラーをスローする可能性があるため、明示的なエラーハンドリングはここでは行いません。
  return { tasks, isLoading, error: null };
}; 