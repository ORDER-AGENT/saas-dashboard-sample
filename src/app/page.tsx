import React from 'react';
import ContentLayout from '@/components/ContentLayout';
import SalesReportsChart from '@/components/SalesReportsChart';
import AnalyticsDoughnutChart from '@/components/AnalyticsDoughnutChart';

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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">アナリティクス</h3>
            </div>
            {/* アナリティクスのプレースホルダー */}
            <AnalyticsDoughnutChart /> {/* ドーナツグラフをここに配置 */}

            {/* ドーナツグラフのカテゴリ表示 */}
            <div className="flex justify-center space-x-4 mt-4 text-sm flex-wrap">
              <div className="flex items-center">
                <span className="block w-3 h-3 rounded-full mr-2 bg-[#5BC4FF]"></span>
                <span>Sale</span>
              </div>
              <div className="flex items-center">
                <span className="block w-3 h-3 rounded-full mr-2 bg-[#FFDF6B]"></span>
                <span>Distribute</span>
              </div>
              <div className="flex items-center">
                <span className="block w-3 h-3 rounded-full mr-2 bg-[#FF7D6B]"></span>
                <span>Return</span>
              </div>
            </div>
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