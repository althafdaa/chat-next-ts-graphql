import React, { FC } from 'react';

interface UserIconProps {
  style: object;
  fill?: string;
}

const UserIcon: FC<UserIconProps> = ({ style, fill = '#BEE3F8' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill={fill}
      style={style}
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default UserIcon;
