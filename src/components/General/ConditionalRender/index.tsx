import React, { FC, ReactNode } from 'react';

interface ConditionalRenderProps {
  children: ReactNode;
  when: boolean;
}

const ConditionalRender: FC<ConditionalRenderProps> = ({ when, children }) => {
  if (when) return <>{children}</>;
  else return <></>;
};

export default ConditionalRender;
