import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import PhotoPlaceholder from '@/assets/img/PhotoPlaceholder.png';
import { getFollowingFieldType } from '../FollowingDrawer';
import Link from 'next/link';

interface FollowingItemProps {
  item: getFollowingFieldType;
  onClose: () => void;
}

const FollowingItem: FC<FollowingItemProps> = ({ item, onClose }) => {
  return (
    <Link href={`/chats/${item.user.id}`}>
      <a onClick={onClose}>
        <Box
          fontSize={'14px'}
          as="span"
          display={'flex'}
          alignItems={'center'}
          gap={'0.5rem'}
          mb="0.5rem"
        >
          <img
            style={{
              height: '24px',
              width: '24px',
              borderRadius: '99999px',
            }}
            src={PhotoPlaceholder.src}
            alt="photoprofile"
          />
          {item.user.userName}
        </Box>
      </a>
    </Link>
  );
};

export default FollowingItem;
