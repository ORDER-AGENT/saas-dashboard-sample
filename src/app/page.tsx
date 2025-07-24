import React from 'react';
import ContentLayout from '@/components/ContentLayout';
import SalesReportsChart from '@/components/SalesReportsChart';

export default function Home() {
  return (
    <ContentLayout>
      <div className="p-4">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow">統計カード1</div>
          <div className="bg-white p-4 rounded-lg shadow">統計カード2</div>
          <div className="bg-white p-4 rounded-lg shadow">統計カード3</div>
          <div className="bg-white p-4 rounded-lg shadow">統計カード4</div>
        </div>

        {/* Reports and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">レポート</h3>
            {/* レポートグラフのプレースホルダーを置き換え */}
            <SalesReportsChart />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3>アナリティクス</h3>
            {/* アナリティクスのプレースホルダー */}
            <div className="h-64 flex items-center justify-center border border-dashed rounded mt-4">ドーナツグラフ</div>
          </div>
        </div>

        {/* Recent Orders and Top Selling Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
            <h3>最近の注文</h3>
            {/* 最近の注文テーブルのプレースホルダー */}
            <div className="h-48 flex items-center justify-center border border-dashed rounded mt-4">注文リスト</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3>売れ筋商品</h3>
            {/* 売れ筋商品リストのプレースホルダー */}
            <div className="h-48 flex items-center justify-center border border-dashed rounded mt-4">商品リスト</div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}