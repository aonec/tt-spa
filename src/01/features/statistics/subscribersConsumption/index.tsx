import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Radio } from 'antd';
import { SubscribersConsumptionSearchType } from './subscribersConsumption.types';
import { DisplayStatisticsListByManagingFirmContainer } from './displayStatisticsListByManagingFirmService';
import { DisplayStatisticsListByHousesContainer } from './displayStatisticsListByHousesService';

export const SubscribersConsumption = () => {
  const { searchType } = useParams<{ searchType: string }>();

  const subscribersConsumptionListComponentsLookup: {
    [key: string]: ReactNode;
  } = useMemo(
    () => ({
      [SubscribersConsumptionSearchType.Houses]: (
        <DisplayStatisticsListByHousesContainer />
      ),
      [SubscribersConsumptionSearchType.ManagingFirm]: (
        <DisplayStatisticsListByManagingFirmContainer />
      ),
    }),
    [],
  );

  const subscribersConsumptionComponent = useMemo(() => {
    if (!searchType) return null;

    const Component = subscribersConsumptionListComponentsLookup[searchType];

    if (!Component) return null;

    return Component;
  }, [searchType, subscribersConsumptionListComponentsLookup]);

  return (
    <Wrap>
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
      {subscribersConsumptionComponent}
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 960px;
  margin: 5px 0px 10px 0px;
`;
