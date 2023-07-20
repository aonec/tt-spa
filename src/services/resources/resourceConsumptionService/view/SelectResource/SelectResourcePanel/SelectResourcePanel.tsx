import { isNull, round } from 'lodash';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/sharedComponents/ResourceIconLookup';
import { ResourceTypeNamesLookup } from '../SelectResource.constants';
import { resourceSummaryUnits } from './SelectResourcePanel.constants';
import {
  ContentWrapper,
  GroupWrapper,
  SummaryWrapper,
  Wrapper,
} from './SelectResourcePanel.styled';
import { SelectResourcePanelProps } from './SelectResourcePanel.types';

export const SelectResourcePanel: FC<SelectResourcePanelProps> = ({
  resource,
  active,
  setResource,
  summary,
}) => {
  const summaryText = isNull(summary)
    ? null
    : `${round(summary)} ${resourceSummaryUnits[resource]}`;

  return (
    <Wrapper active={active} onClick={() => setResource(resource)}>
      <ContentWrapper>
        <div>
          <ResourceIconLookup resource={resource} />
        </div>
        <GroupWrapper>
          <SummaryWrapper>{summaryText}</SummaryWrapper>
          <div>{ResourceTypeNamesLookup[resource]}</div>
        </GroupWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};
