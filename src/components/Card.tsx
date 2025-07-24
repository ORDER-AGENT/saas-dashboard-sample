import React, { ReactNode } from 'react';
import CardHeader from '@/components/CardHeader';
import CardBase from '@/components/CardBase';

interface CardProps {
  title?: string;
  children: ReactNode;
  dropdownItems?: ReactNode[];
}

const Card: React.FC<CardProps> = ({ title, children, dropdownItems }) => {
  return (
    <CardBase>
      {title && <CardHeader title={title} dropdownItems={dropdownItems} />}
      {children}
    </CardBase>
  );
};

export default Card;