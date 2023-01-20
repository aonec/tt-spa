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
import { ReportsPageProps } from './ReportsPage.types';
import { PageHeader } from '01/shared/ui/PageHeader';
import { ReportsListContainer } from '01/features/reports/reportsListService';
import {
  ReportNamesDictionary,
  reportsSelectItems,
} from './ReportsPage.constants';

export const ReportsPage: FC<ReportsPageProps> = ({}) => {
  const reportsListRef = useRef<HTMLDivElement>(null);

  const [scrollX, setScrollX] = useState<number>(0);

  useEffect(() => {
    if (!reportsListRef.current) return;

    const handleScroll = () => {
      reportsListRef.current?.scrollLeft &&
        setScrollX(reportsListRef.current.scrollLeft);
    };

    reportsListRef.current.addEventListener('scroll', handleScroll);

    return () =>
      reportsListRef?.current?.removeEventListener('scroll', handleScroll);
  }, [reportsListRef.current]);

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
          {reportsSelectItems.map(({ icon, reportType }) => (
            <ReportBlock key={reportType} to={`/reports/${reportType}`}>
              {icon}
              <ReportName>{ReportNamesDictionary[reportType]}</ReportName>
            </ReportBlock>
          ))}
        </ReportsList>
      </ReportBlocksWrapper>
      <ReportsListContainer />
    </Wrapper>
  );
};
