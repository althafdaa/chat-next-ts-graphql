import React, { FC } from 'react';

interface ChevronIconProps {
  style: object;
  dir?: string | 'left' | 'right' | 'top' | 'bottom';
}

const ChevronIcon: FC<ChevronIconProps> = ({ style, dir = 'left' }) => {
  const degree =
    dir === 'right'
      ? '180deg'
      : dir === 'top'
      ? '90deg'
      : dir === 'bottom'
      ? '-90deg'
      : 'none';

  const transform = dir === 'left' ? 'none' : `rotate(${degree})`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, transform }}
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
};

export default ChevronIcon;
