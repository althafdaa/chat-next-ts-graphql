import ChatIcon from '@/assets/icons/ChatIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import UserIcon from '@/assets/icons/UserIcon';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavigationProps {
  onOpen: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpen }) => {
  const router = useRouter();

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
      <Box
        as="button"
        display={'flex'}
        flexDir={'column'}
        alignItems="center"
        onClick={onOpen}
      >
        <ChatIcon style={{ height: '24px' }} />
        <Text fontSize={'xs'} color="green.100">
          Following
        </Text>
      </Box>

      <Link href={'/search'} passHref>
        <a>
          <Box display={'flex'} flexDir={'column'} alignItems="center">
            <SearchIcon
              style={{ height: '24px' }}
              fill={router.asPath === '/search' ? '#2D3748' : '#BEE3F8'}
            />

            <Text
              fontSize={'xs'}
              color={router.asPath === '/search' ? '#2D3748' : '#BEE3F8'}
              fontWeight={router.asPath === '/search' ? 700 : 400}
            >
              Search
            </Text>
          </Box>
        </a>
      </Link>

      <Link href={'/profile'} passHref>
        <a>
          <Box display={'flex'} flexDir={'column'} alignItems="center">
            <UserIcon
              style={{ height: '24px' }}
              fill={
                router.asPath === '/profile' ||
                router.asPath === '/profile/reset-password'
                  ? '#2D3748'
                  : '#BEE3F8'
              }
            />

            <Text
              fontSize={'xs'}
              color={
                router.asPath === '/profile' ||
                router.asPath === '/profile/reset-password'
                  ? '#2D3748'
                  : '#BEE3F8'
              }
              fontWeight={
                router.asPath === '/profile' ||
                router.asPath === '/profile/reset-password'
                  ? 700
                  : 400
              }
            >
              Profile
            </Text>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

export default Navigation;
