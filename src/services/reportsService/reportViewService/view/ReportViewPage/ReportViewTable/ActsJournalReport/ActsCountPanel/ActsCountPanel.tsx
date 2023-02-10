import React, { FC } from 'react';
import { Panel, TextWrapper, Wrapper } from './ActsCountPanel.styled';
import { ActsCountPanelProps } from './ActsCountPanel.types';
import { getActsCountText } from './ActsCountPanel.utils';

export const ActsCountPanel: FC<ActsCountPanelProps> = ({ count }) => {
  
  const actsCountText = getActsCountText(count);
  
  return (
    <Wrapper>
      <Panel>
        <TextWrapper>Итого</TextWrapper>
        <TextWrapper>
          {count} {actsCountText}
        </TextWrapper>
      </Panel>
    </Wrapper>
  );
};
