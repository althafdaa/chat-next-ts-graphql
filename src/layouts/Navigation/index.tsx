import ChatIcon from '@/assets/icons/ChatIcon';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <Box
      position={'absolute'}
      bottom={0}
      minW={'100%'}
      bgColor={'green.600'}
      display={'flex'}
      alignItems="center"
      justifyContent={'space-between'}
      flexShrink={1}
      px={'1rem'}
      py="0.5rem"
    >
      <Box display={'flex'} flexDir={'column'} alignItems="center">
        <ChatIcon />
        <Text fontSize={'xs'} color="green.100">
          Following
        </Text>
      </Box>

      <Box display={'flex'} flexDir={'column'} alignItems="center">
        <ChatIcon />
        <Text fontSize={'xs'} color="green.100">
          Messages
        </Text>
      </Box>

      <Link href={'/profile'} passHref>
        <a>
          <Box display={'flex'} flexDir={'column'} alignItems="center">
            <ChatIcon />
            <Text fontSize={'xs'} color="green.100">
              Profile
            </Text>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

export default Navigation;
