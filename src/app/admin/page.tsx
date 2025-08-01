'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import ContentLayout from '@/components/ContentLayout';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SimpleSpinner from '@/components/loader/SimpleSpinner';

function AdminForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  // ステート変数の定義

  // フォーム送信時のハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const callbackUrl = searchParams.get('callbackUrl') || '/'; // callbackUrlを取得、なければ'/'をデフォルトに

    try {
      // NextAuth.jsのcredentialsプロバイダーでサインインを試みる
      const result = await signIn('credentials', {
        redirect: false,
        password: password,
        callbackUrl: callbackUrl, // 取得したcallbackUrlを渡す
      });

      if (result?.ok) {
        toast.success('ログインに成功しました！');
        router.push(callbackUrl); // callbackUrlにリダイレクト
      } else {
        const errorMessage = result?.error || 'ログインに失敗しました。';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = 'サーバーとの通信中にエラーが発生しました。';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <ContentLayout>
      <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#ffffff' }}>
        <h1>管理者ログイン</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>パスワード:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
              }}
            />
          </div>
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ログイン
          </button>
        </form>
      </div>
    </ContentLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><SimpleSpinner /></div>}>
      <AdminForm />
    </Suspense>
  );
}
