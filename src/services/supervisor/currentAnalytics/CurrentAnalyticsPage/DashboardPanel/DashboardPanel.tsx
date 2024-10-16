import { FC } from 'react';
import {
  DangerWrapper,
  LinkButtonWrapper,
  RatioWrapper,
  ResourceStatisticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { ResourceStatistic } from './ResourceStatistic';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import {
  getRatioOfTasksCount,
  getRatioOfTasksCountByOthers,
} from './DashboardPanel.utils';
import { OtherDeitalStatistic } from './OtherDeitalStatistic';

export const DashboardPanel: FC<Props> = ({ data, otherData }) => {
  if (otherData) {
    const ratioOfOthers = getRatioOfTasksCountByOthers(otherData);

    return (
      <Wrapper>
        <Title>Остальные округа</Title>
        <RatioWrapper>
          <DangerWrapper isPositive={(ratioOfOthers?.danger || 0) > 0}>
            {ratioOfOthers?.danger}
          </DangerWrapper>{' '}
          / {ratioOfOthers?.all}
        </RatioWrapper>
        <ResourceStatisticsWrapper>
          {otherData.map((item) => (
            <OtherDeitalStatistic item={item} />
          ))}
        </ResourceStatisticsWrapper>
        <LinkButtonWrapper>
          <LinkButton onClick={() => void 0}>Показать больше</LinkButton>
        </LinkButtonWrapper>
      </Wrapper>
    );
  }

  if (!data) return null;

  const ratioOfTasksCount = getRatioOfTasksCount(data.details || []);

  return (
    <Wrapper>
      <Title>{data.title}</Title>
      <RatioWrapper>
        <DangerWrapper isPositive={(ratioOfTasksCount?.danger || 0) > 0}>
          {ratioOfTasksCount?.danger}
        </DangerWrapper>{' '}
        / {ratioOfTasksCount?.all}
      </RatioWrapper>
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <ResourceStatistic data={detail} />
        ))}
      </ResourceStatisticsWrapper>
      <LinkButtonWrapper>
        <LinkButton onClick={() => void 0}>Подробнее</LinkButton>
      </LinkButtonWrapper>
    </Wrapper>
  );
};
