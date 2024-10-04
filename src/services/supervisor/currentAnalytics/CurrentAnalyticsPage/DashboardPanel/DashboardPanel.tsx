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

export const DashboardPanel: FC<Props> = ({ data }) => {
  const ratioOfTasksCount = data.details?.reduce(
    (acc, elem) => {
      const res = elem.items?.reduce(
        (acc, elem) => ({
          ...acc,
          danger: acc.danger + (elem?.notClosedTasksCount || 0),
          all: acc.all + (elem?.totalTasksCount || 0),
        }),
        {
          danger: 0,
          all: 0,
        },
      );

      return {
        danger: (res?.danger || 0) + acc.danger,
        all: (res?.all || 0) + acc.all,
      };
    },
    {
      danger: 0,
      all: 0,
    },
  );

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
