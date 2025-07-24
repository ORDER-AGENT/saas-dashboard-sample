import React from 'react';
import ContentLayout from '@/components/ContentLayout';
import SalesReportsChart from '@/components/SalesReportsChart';
import AnalyticsDoughnutChart from '@/components/AnalyticsDoughnutChart';
import Card from '@/components/Card'; // Cardコンポーネントをインポート
import { DropdownMenuItem/*, DropdownMenuSeparator*/ } from '@/components/ui/dropdown-menu';

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
          <div className="lg:col-span-2">
            <SalesReportsChart
            />
          </div>
          <div>
            <AnalyticsDoughnutChart
            />
          </div>
        </div>

        {/* Recent Orders and Top Selling Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card
              title="最近の注文"
              dropdownItems={[
                <DropdownMenuItem key="orders-1">注文オプションX</DropdownMenuItem>,
                <DropdownMenuItem key="orders-2">注文オプションY</DropdownMenuItem>,
              ]}
            >
              <div className="h-48 flex items-center justify-center border border-dashed rounded mt-4">注文リスト</div>
            </Card>
          </div>
          <div>
            <Card
              title="売れ筋商品"
            >
              <div className="h-48 flex items-center justify-center border border-dashed rounded mt-4">商品リスト</div>
            </Card>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}