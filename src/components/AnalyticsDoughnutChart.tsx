'use client';

//import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Text, SectorProps } from 'recharts';
import Card from '@/components/Card';
import { DropdownMenuItem/*, DropdownMenuSeparator*/ } from '@/components/ui/dropdown-menu';

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: DataItem;
};
type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;


// PieChartのデータ型を定義
interface DataItem {
  name: string;
  value: number;
}

// ドーナツチャートのデータ
const data: DataItem[] = [
  { name: 'Sale', value: 400 },
  { name: 'Distribute', value: 100 },
  { name: 'Return', value: 100 },
  { name: 'Others', value: 100 },
];

// ドーナツチャートの色
const COLORS = ['#5BC4FF', '#FFDF6B', '#FF7D6B', '#E0E0E0'];

const CustomActiveSector = (props: PieSectorDataItem) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, /*payload,*/ value, name } = props;

  // 全体の合計値を計算（パーセンテージ表示用）
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const percentage = (((value ?? 0) / totalValue) * 100).toFixed(0);

  return (
    <g>
      {/* アクティブなセクターを描画 */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* 外側のライン */}
			<Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      {/* 中央のテキストを動的に表示 */}
      <Text x={cx} y={(cy ?? 0) - 10} textAnchor="middle" dominantBaseline="central" fill="#333" className="font-bold text-2xl">
        {`${percentage}%`}
      </Text>
      <Text x={cx} y={(cy ?? 0) + 10} textAnchor="middle" dominantBaseline="central" fill="#666" className="text-sm">
        {name}
      </Text>
    </g>
  );
};

/*type AnalyticsDoughnutChartProps = {
  title?: string;
};
*/

const AnalyticsDoughnutChart/*: React.FC<AnalyticsDoughnutChartProps>*/ = () => {
  // ドロップダウンメニューの項目をコンポーネント内部で定義
  const dropdownItems = [
    <DropdownMenuItem key="analytics-1">アナリティクスオプションA</DropdownMenuItem>,
    <DropdownMenuItem key="analytics-2">アナリティクスオプションB</DropdownMenuItem>,
  ];

  return (
    <Card title="アナリティクス" dropdownItems={dropdownItems}> {/* タイトルを内部で定義 */}
      {/* 全体の高さを300pxにし、flexboxで子要素を縦方向に配置 */}
      <div className="h-[300px] flex flex-col">
        {/* チャート部分が残りのスペースを占めるようにflex-growを適用 */}
        <div className="flex-grow">
          {/* ResponsiveContainerのheightを"100%"に設定し、親のflex-growに合わせる */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270} // 時計回りに360度
                activeShape={CustomActiveSector}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}

              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ドーナツグラフのカテゴリ表示。mt-4は残しておき、自然な間隔を保つ */}
        <div className="flex justify-center space-x-4 mt-4 text-sm flex-wrap">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center">
              <span
                className="block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsDoughnutChart; 