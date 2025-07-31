'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface StatisticsCardProps {
  icon: IconType;
  value: string;
  label: string;
  iconBgColor: string;
  iconColor: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ icon: Icon, value, label, iconBgColor, iconColor }) => {
  return (
    <div className="bg-white p-1 pl-2 md:p-2 lg:p-4 rounded-lg shadow flex items-center space-x-4">
      <div className={`p-1 md:p-2 lg:p-3 rounded-full ${iconBgColor}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <div className="test-xl lg:text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default StatisticsCard; 