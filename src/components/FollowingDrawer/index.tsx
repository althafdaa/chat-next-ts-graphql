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

const FollowingDrawer: FC<FollowingDrawerProps> = ({ isOpen, onClose }) => {
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
                <FollowingItem />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FollowingDrawer;
