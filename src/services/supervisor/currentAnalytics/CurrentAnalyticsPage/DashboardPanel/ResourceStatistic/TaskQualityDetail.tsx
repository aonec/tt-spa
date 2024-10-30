import { FC } from 'react';
import {
  AnalitycsDetailWrapper,
  DiviationTitle,
  NotClosedTaskCount,
  ProgressSC,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import {
  DashboardServiceQualityDetailsModel,
  ETemperatureNormativeDeviationType,
} from 'api/types';
import { AnalitycsDetail } from './AnalyticsDetail';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';

export const TaskQualityDetail: FC<
  Props<DashboardServiceQualityDetailsModel>
> = ({ data }) => {
  return (
    <Wrapper>
      <Title>
        <DiviationTitle>
          {data.deviationType && (
            <>
              {DeviationTypeIconLookup[data.deviationType]}
              {DeviationTypeDescriptionsLookup[data.deviationType]}
            </>
          )}
        </DiviationTitle>
        <NotClosedTaskCount isPositive={false}>
          {data.expiredTasksCount} / {data.totalTasksCount}
        </NotClosedTaskCount>{' '}
      </Title>

      <ProgressSC
        percent={(data.expiredTasksCount! / data.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      />

      <AnalitycsDetailWrapper>
        {data.items?.map((data) => (
          <AnalitycsDetail hideExpired data={data} />
        ))}
      </AnalitycsDetailWrapper>
    </Wrapper>
  );
};

const DeviationTypeDescriptionsLookup = {
  [ETemperatureNormativeDeviationType.Overheating]:
    'Превышение температурного графика',
  [ETemperatureNormativeDeviationType.Underheating]:
    'Занижение температурного графика',
};

const DeviationTypeIconLookup = {
  [ETemperatureNormativeDeviationType.Overheating]: <ArrowUp />,
  [ETemperatureNormativeDeviationType.Underheating]: <ArrowDown />,
};
