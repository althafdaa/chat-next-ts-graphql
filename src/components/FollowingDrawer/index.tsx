import { GET_FOLLOWING } from '@/client/graphquery/query';
import { useQuery } from '@apollo/client';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { parseCookies } from 'nookies';
import React, { FC } from 'react';
import FollowingItem from '../FollowingItem';

interface FollowingDrawerProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
}

interface User {
  id: string;
  userName: string;
}

interface FollowingType {
  getFollowing: {
    __typename: string;
    user: User;
  };
}

const FollowingDrawer: FC<FollowingDrawerProps> = ({ isOpen, onClose }) => {
  const { data, loading } = useQuery(GET_FOLLOWING);

  if (loading) return <div>Loading ....</div>;

  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody px={'1rem'}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box fontWeight={600} flex="1" textAlign="left">
                    Followings
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {data.getFollowing.map((item: FollowingType, idx: number) => {
                  return <FollowingItem item={item} key={idx} />;
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FollowingDrawer;
