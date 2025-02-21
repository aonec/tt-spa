import { FC } from 'react';
import {
  AnalyticsDetailWrapper,
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
import { AnalyticsDetail } from './AnalyticsDetail';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';

export const TaskQualityDetail: FC<
  Props<DashboardServiceQualityDetailsModel>
> = ({ data, title }) => {
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
        strokeColor={'#39437b'}
        size={['100%', 3]}
      />

      <AnalyticsDetailWrapper>
        {data.items?.map((item) => (
          <AnalyticsDetail
            key={item.id}
            data={item}
            deviationType={data.deviationType}
            title={title}
          />
        ))}
      </AnalyticsDetailWrapper>
    </Wrapper>
  );
};

export const DeviationTypeDescriptionsLookup = {
  [ETemperatureNormativeDeviationType.Overheating]:
    'Превышение температурного графика',
  [ETemperatureNormativeDeviationType.Underheating]:
    'Занижение температурного графика',
};

export const DeviationTypeIconLookup = {
  [ETemperatureNormativeDeviationType.Overheating]: <ArrowUp />,
  [ETemperatureNormativeDeviationType.Underheating]: <ArrowDown />,
};
