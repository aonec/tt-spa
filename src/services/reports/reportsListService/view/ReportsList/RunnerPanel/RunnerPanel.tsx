import React, { FC } from 'react';
import {
  ChevronIconRight,
  LeftBlock,
  RightBlock,
  Wrapper,
} from './RunnerPanel.styled';
import { Props } from './RunnerPanel.types';
import { DocumentBoldIcon } from 'ui-kit/icons';
import { Loader } from 'ui-kit/Loader';
import { CheckSquare } from 'react-bootstrap-icons';

export const RunnerPanel: FC<Props> = ({
  setRunnerModalOpen,
  runnerStageNumber,
}) => {
  return (
    <Wrapper onClick={() => setRunnerModalOpen(true)}>
      <LeftBlock>
        <DocumentBoldIcon />
        Скачать бегунок
      </LeftBlock>
      <RightBlock>
        {runnerStageNumber === 1 && <ChevronIconRight />}
        {runnerStageNumber === 2 && <Loader show />}
        {runnerStageNumber === 3 && <CheckSquare size={24} />}
      </RightBlock>
    </Wrapper>
  );
};
