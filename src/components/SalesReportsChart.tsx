'use client';

//import React, { useState, useEffect } from 'react';
import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import Card from '@/components/Card';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';


// グラフのダミーデータ
const salesData = [
  { time: '10am', sales: 55 },
  { time: '11am', sales: 30 },
  { time: '12pm', sales: 58 },
  { time: '01am', sales: 35 },
  { time: '02am', sales: 22 },
  { time: '03am', sales: 48 },
  { time: '04am', sales: 15 },
  { time: '05am', sales: 35 },
  { time: '06am', sales: 68 },
  { time: '07am', sales: 55 },
];

interface CustomTooltipProps { // TooltipPropsを継承せず、必要なプロパティを直接定義
  active?: boolean;
  payload?: Array<{ value: ValueType; name: NameType }>;
  label?: string | number; // labelはstringまたはnumberの可能性がある
  coordinate?: { x: number; y: number };
}

// カスタムツールチップコンポーネント
const CustomTooltip = ({ active, payload, coordinate }: CustomTooltipProps) => {
  if (active && payload && payload.length && coordinate) {
    return (
      <div
        className="absolute bg-black text-white p-2 rounded shadow-lg text-sm pointer-events-none transition-transform duration-300 ease-in-out text-center" // text-center クラスを追加
        style={{
          // left/topの代わりにtransformを使用し、パフォーマンスを向上
          // coordinateプロパティから座標を取得
          // translateX(-50%)で水平中央揃え
          // translateY(-100%)で要素の上辺を基準点に合わせる
          // さらにtranslateY(-10px)で少し上にオフセット
          transform: `translate(${coordinate.x}px, ${
            coordinate.y
          }px) translateX(-50%) translateY(-100%) translateY(-10px)`,
          // leftとtopは不要になる
          // left: left ? `${Math.round(Number(left))}px` : undefined,
          // top: top ? `${Math.round(Number(top) - 10)}px` : undefined,
        }}>
        <p className="font-bold">Sales</p>
        <p>{`${payload[0].value}`}</p>
        {/* 吹き出しのしっぽ */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black -mb-2"></div>
      </div>
    );
  }
  return null;
};

/*type SalesReportsChartProps = {
  title?: string;
};
*/

// グラフコンポーネントの例
const SalesReportsChart/*: React.FC<SalesReportsChartProps>*/ = () => {
  // ドロップダウンメニューの項目をコンポーネント内部で定義
  const dropdownItems = [
    <DropdownMenuItem key="report-1">レポートオプション1</DropdownMenuItem>,
    <DropdownMenuItem key="report-2">レポートオプション2</DropdownMenuItem>,
    <DropdownMenuSeparator key="report-separator" />,
    <DropdownMenuItem key="report-3">レポートオプション3</DropdownMenuItem>,
  ];

  return (
    <Card title="レポート" dropdownItems={dropdownItems}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={salesData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <Tooltip
            isAnimationActive={true}
            animationDuration={300}
            animationEasing="ease-in-out"
            allowEscapeViewBox={{ x: true, y: true }}
            cursor={{ stroke: 'gray', strokeWidth: 1, strokeDasharray: '5' }}
            content={<CustomTooltip />}
          />
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5BC4FF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF5BEF" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#5BC4FF" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#FF5BEF" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="sales" stroke="none" fill="url(#areaGradient)" />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="url(#salesGradient)"
            strokeWidth={4}
            dot={{ stroke: 'url(#salesGradient)', strokeWidth: 2, r: 5, fill: '#fff' }}
            activeDot={{ r: 8, stroke: 'url(#salesGradient)', fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesReportsChart;
