import { round } from 'lodash';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { ResourceTypeNamesLookup } from '../SelectResource.constants';
import { resourceSummaryUnits } from './SelectResourcePanel.constants';
import {
  ContentWrapper,
  GroupWrapper,
  SummaryWrapper,
  Wrapper,
} from './SelectResourcePanel.styled';
import { SelectResourcePanelProps } from './SelectResourcePanel.types';
import { Skeleton } from 'antd';

export const SelectResourcePanel: FC<SelectResourcePanelProps> = ({
  resource,
  active,
  setResource,
  summary,
  isSummaryLoading,
}) => {
  const isSummaryExist = Boolean(summary);
  const summaryText = isSummaryExist ? `${summary && round(summary)} ` : null;

  return (
    <Wrapper active={active} onClick={() => setResource(resource)}>
      <ContentWrapper>
        <div>
          <ResourceIconLookup resource={resource} />
        </div>
        <GroupWrapper>
          <SummaryWrapper>
            {!isSummaryLoading ? summaryText : null}
            {isSummaryLoading ? (
              <Skeleton.Button
                active={true}
                size="small"
                style={{ height: '16px' }}
              />
            ) : null}
            {isSummaryExist ? resourceSummaryUnits[resource] : null}
          </SummaryWrapper>
          <div>{ResourceTypeNamesLookup[resource]}</div>
        </GroupWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};
