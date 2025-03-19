import { FC } from 'react';
import {
  Expired,
  MalfunctionWrapper,
  TasksCountWrapper,
  Wrapper,
} from './DetailItem.styled';
import { Props } from './DetailItem.types';
import {
  DashboardMalfunctionChartItemModel,
  DashboardResourceChartItemModel,
} from 'api/types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { MalfunctionIcon } from '../../../DashboardAnalyticsDetail/MalfunctionIcon';
import { MalfunctionTypeDictionary } from 'dictionaries';

export const DetailItem: FC<Props> = ({ detail }) => {
  const isExpired = Boolean(detail?.expiredTasksCount);

  const type =
    'resourceType' in detail ? (
      <ResourceInfo
        resource={(detail as DashboardResourceChartItemModel).resourceType!}
      />
    ) : (
      <MalfunctionWrapper>
        <MalfunctionIcon
          type={(detail as DashboardMalfunctionChartItemModel).malfunctionType!}
        />
        {
          MalfunctionTypeDictionary[
            (detail as DashboardMalfunctionChartItemModel).malfunctionType!
          ]
        }
      </MalfunctionWrapper>
    );

  return (
    <Wrapper>
      {type}
      <TasksCountWrapper>
        <Expired isExpired={isExpired}>{detail?.expiredTasksCount}</Expired>
        <div>/</div>
        {detail?.totalTasksCount}
      </TasksCountWrapper>
    </Wrapper>
  );
};
