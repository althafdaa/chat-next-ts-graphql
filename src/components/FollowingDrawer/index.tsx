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
import React, { FC } from 'react';
import FollowingItem from '../FollowingItem';
interface FollowingDrawerProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
}
interface getFollowingUsertype {
  id: string;
  userName: string;
}
export interface getFollowingFieldType {
  __typename: string;
  user: getFollowingUsertype;
}
interface getFollowingResponseType {
  getFollowing: getFollowingFieldType[];
}

const FollowingDrawer: FC<FollowingDrawerProps> = ({ isOpen, onClose }) => {
  const { data, loading, error } =
    useQuery<getFollowingResponseType>(GET_FOLLOWING);

  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        {error && <div>Something went wrong</div>}
        {loading && <div>...Loading</div>}

        {!loading && !error && (
          <DrawerBody px={'1rem'}>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box fontWeight={600} flex="1" textAlign="left">
                      My Followings
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {data?.getFollowing.map((item: getFollowingFieldType) => {
                    return <FollowingItem item={item} key={item.user.id} />;
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default FollowingDrawer;
