import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ChevronIconSC,
  ReportBlock,
  ReportBlocksWrapper,
  ReportName,
  ReportsList,
  ScrollButton,
  Title,
  Wrapper,
} from './ReportsPage.styled';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import {
  ReportIconsDictionary,
  ReportNamesDictionary,
  reportsSelectItems,
} from './ReportsPage.constants';
import { CreateRunnerContainer } from 'services/reportsService/createRunnerService';
import { ReportsListContainer } from 'services/reportsService/reportsListService';

export const ReportsPage: FC = () => {
  const reportsListRef = useRef<HTMLDivElement>(null);

  const [scrollX, setScrollX] = useState<number>(0);

  useEffect(() => {
    const node = reportsListRef.current;

    if (!node) return;

    const handleScroll = () => {
      if (node.scrollLeft) setScrollX(node.scrollLeft);
    };

    node.addEventListener('scroll', handleScroll);

    return () => node?.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (scrollOffset: number) => {
    if (!reportsListRef.current) return;

    reportsListRef.current.scrollLeft += scrollOffset;
  };

  const onClickLeft = () => scroll(-280);
  const onClickRight = () => scroll(280);

  const isShowLeftScrollButton = scrollX > 15;
  const isShowRightScrollButton = scrollX < 290;

  return (
    <Wrapper>
      <PageHeader title="Отчеты" />
      <Title>Новый отчет</Title>
      <ReportBlocksWrapper>
        {isShowLeftScrollButton && (
          <ScrollButton onClick={onClickLeft}>
            <ChevronIconSC />
          </ScrollButton>
        )}
        {isShowRightScrollButton && (
          <ScrollButton onClick={onClickRight} isRight>
            <ChevronIconSC isRight />
          </ScrollButton>
        )}
        <ReportsList ref={reportsListRef}>
          {reportsSelectItems.map((reportType) => (
            <ReportBlock key={reportType} to={`/reports/${reportType}`}>
              {ReportIconsDictionary[reportType]}
              <ReportName>{ReportNamesDictionary[reportType]}</ReportName>
            </ReportBlock>
          ))}
        </ReportsList>
      </ReportBlocksWrapper>
      <ReportsListContainer />
      <CreateRunnerContainer />
    </Wrapper>
  );
};
