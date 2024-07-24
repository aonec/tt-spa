import React, { FC } from 'react';
import {
  ChevronIconRight,
  LeftBlock,
  RightBlock,
  Wrapper,
} from './RunnerPanel.styled';
import { Props } from './RunnerPanel.types';
import { DocumentBoldIcon } from 'ui-kit/icons';

export const RunnerPanel: FC<Props> = ({ setRunnerModalOpen }) => {
  return (
    <Wrapper onClick={() => setRunnerModalOpen(true)}>
      <LeftBlock>
        <DocumentBoldIcon /> Скачать бегунок
      </LeftBlock>
      <RightBlock>
        <ChevronIconRight />
      </RightBlock>
    </Wrapper>
  );
};
