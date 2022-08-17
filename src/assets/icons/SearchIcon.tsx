import React, { FC } from 'react';

interface SearchIconProps {
  style: object;
  fill?: string;
}

const SearchIcon: FC<SearchIconProps> = ({ style, fill = '#BEE3F8' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill={fill}
      viewBox="0 0 24 24"
      stroke={fill}
      strokeWidth={2}
      style={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export default SearchIcon;
