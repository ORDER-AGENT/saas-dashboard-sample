'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ContentLayout from '@/components/ContentLayout';
import { useEffect } from 'react';


export default function UsersPage() {
  const { status } = useSession(); // セッション情報を取得
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // セッションのロード中は何もせず待機

    if (status === 'unauthenticated') {
      router.push('/admin'); // ログインしていない場合はログインページへリダイレクト
    }
  }, [status, router]); // statusまたはrouterが変更されたときに実行

  if (status === 'loading' || status === 'unauthenticated') {
    return null; // ロード中または未認証の場合は何もレンダリングしない
  }

  return (
    <ContentLayout>
      <h1>ユーザー情報</h1>
      <p><strong>名前:</strong> ダミー 太郎</p>
      <p><strong>メールアドレス:</strong> dummy.taro@example.com</p>
    </ContentLayout>
  );
}