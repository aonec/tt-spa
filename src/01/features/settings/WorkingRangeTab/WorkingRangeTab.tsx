import React, { FC } from 'react';
import { ChevronIconRight, Panel, Wrapper } from './WorkingRangeTab.styled';
import {
  WorkingRangeTabProps,
  WorkingRangeType,
} from './WorkingRangeTab.types';
import { useHistory } from 'react-router-dom';

export const WorkingRangeTab: FC<WorkingRangeTabProps> = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Panel
        onClick={() => {
          history.push(`operatingRanges/${WorkingRangeType.Standart}`);
        }}
      >
        Стандартные рабочие диапазоны <ChevronIconRight />
      </Panel>
      <Panel
        onClick={() => {
          history.push(`operatingRanges/${WorkingRangeType.Group}`);
        }}
      >
        Групповые рабочие диапазоны <ChevronIconRight />
      </Panel>
      <Panel
        onClick={() => {
          history.push(`operatingRanges/${WorkingRangeType.Unique}`);
        }}
      >
        Уникальные рабочие диапазоны <ChevronIconRight />
      </Panel>
    </Wrapper>
  );
};
