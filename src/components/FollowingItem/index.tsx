import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import PhotoPlaceholder from '@/assets/img/PhotoPlaceholder.png';

interface FollowingItemProps {
  item: object;
}

const FollowingItem: FC<FollowingItemProps> = ({ item }) => {
  return (
    <Box
      fontSize={'14px'}
      as="span"
      display={'flex'}
      alignItems={'center'}
      gap={'0.5rem'}
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
  );
};

export default FollowingItem;
