import { MessageType } from '@/pages/chats/[id]';
import { Box } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import moment from 'moment';

interface ChatBubbleProps {
  item: MessageType;
  children: ReactNode;
}

const ChatBubble: FC<ChatBubbleProps> = ({ item, children }) => {
  return (
    <Box alignSelf={'end'} mr="1rem" mb={'1rem'} display="flex" gap={'0.3rem'}>
      <Box as="span" alignSelf={'end'} fontSize="xs">
        {moment(item.createdAt).format('DD ll, h:mm')}
      </Box>

      <Box
        bg={'blue.200'}
        px="1rem"
        py="0.2rem"
        roundedTop={'lg'}
        maxW="250px"
        roundedBottomLeft="lg"
      >
        {children}
      </Box>
    </Box>
  );
};

export default ChatBubble;
