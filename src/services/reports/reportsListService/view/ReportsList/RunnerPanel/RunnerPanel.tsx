import React, { FC } from 'react';
import {
  ChevronIconRight,
  DownloadBlock,
  LeftBlock,
  LoadingBlock,
  RightBlock,
  Wrapper,
} from './RunnerPanel.styled';
import { Props } from './RunnerPanel.types';
import {
  CheckGreenIcon,
  DocumentBoldIcon,
  LoadingBlueIcon,
} from 'ui-kit/icons';

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
        {runnerStageNumber === 2 && (
          <LoadingBlock>
            <LoadingBlueIcon />
            Формируется
          </LoadingBlock>
        )}
        {runnerStageNumber === 3 && (
          <DownloadBlock>
            <CheckGreenIcon /> Готов к скачиванию
          </DownloadBlock>
        )}
      </RightBlock>
    </Wrapper>
  );
};
