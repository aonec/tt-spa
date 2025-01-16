import React, { FC } from 'react';
import {
  Devider,
  LeftBlock,
  PageTitle,
  Panel,
  RightBlock,
  Wrapper,
} from './StartPage.styled';
import { Props } from './StartPage.types';
import { DocumentBigIcon, DownloadGrayIcon, ExportIcon } from 'ui-kit/icons';
import { ChevronIconRight } from 'services/workingRanges/WorkingRangeTab/WorkingRangeTab.styled';

export const StartPage: FC<Props> = ({ handleReportTypeModalOpen }) => {
  return (
    <Wrapper>
      <PageTitle>Работа с показаниями</PageTitle>

      <Panel onClick={() => handleReportTypeModalOpen(true)}>
        <LeftBlock>
          <ExportIcon /> Экспорт показаний
        </LeftBlock>
        <RightBlock>
          <ChevronIconRight />
        </RightBlock>
      </Panel>

      <Panel>
        <LeftBlock>
          <DownloadGrayIcon /> Импорт показаний
        </LeftBlock>
        <RightBlock>
          <ChevronIconRight />
        </RightBlock>
      </Panel>

      <Devider />

      <Panel>
        <LeftBlock>
          <DocumentBigIcon /> Архив отчетов
        </LeftBlock>
        <RightBlock>
          <ChevronIconRight />
        </RightBlock>
      </Panel>
    </Wrapper>
  );
};
