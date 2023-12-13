import React from 'react';
import { SubscribersConsumptionSearchType } from './subscribersConsumptionService.types';
import { Link, useParams } from 'react-router-dom';
import { Radio } from 'antd';
import { DisplayStatisticsListByManagingFirmContainer } from './displayStatisticsListByManagingFirmService';
import { DisplayStatisticsListByHousesContainer } from './displayStatisticsListByHousesService';
import { ContentWrapper } from './subscribersConsumptionService.styled';

export const SubscribersConsumptionContainer = () => {
  const { searchType } = useParams<{
    searchType: SubscribersConsumptionSearchType;
  }>();

  if (!searchType) return null;

  const subscribersConsumptionListComponentsLookup = {
    [SubscribersConsumptionSearchType.Houses]: (
      <DisplayStatisticsListByHousesContainer />
    ),
    [SubscribersConsumptionSearchType.ManagingFirm]: (
      <DisplayStatisticsListByManagingFirmContainer />
    ),
  };

  return (
    <>
      <Radio.Group value={searchType}>
        <Link
          to={`/statistics/subscribersConsumption/${SubscribersConsumptionSearchType.Houses}`}
        >
          <Radio value={SubscribersConsumptionSearchType.Houses}>
            Поиск по адресу
          </Radio>
        </Link>
        <Link
          to={`/statistics/subscribersConsumption/${SubscribersConsumptionSearchType.ManagingFirm}`}
        >
          <Radio value={SubscribersConsumptionSearchType.ManagingFirm}>
            Поиск по домоуправлениям
          </Radio>
        </Link>
      </Radio.Group>
      <ContentWrapper>
        {subscribersConsumptionListComponentsLookup[searchType]}
      </ContentWrapper>
    </>
  );
};
