import React, { FC } from 'react';
import { ChevronIconRight, Panel, Wrapper } from './WorkingRangeTab.styled';
import {
  WorkingRangeTabProps,
  WorkingRangeType,
} from './WorkingRangeTab.types';
import { useNavigate } from 'react-router-dom';

export const WorkingRangeTab: FC<WorkingRangeTabProps> = () => {
  const history = useNavigate();

  return (
    <Wrapper>
      <Panel
        onClick={() => {
          history(`${WorkingRangeType.Standart}`);
        }}
      >
        Стандартные рабочие диапазоны <ChevronIconRight />
      </Panel>
      <Panel
        onClick={() => {
          history(`${WorkingRangeType.Group}`);
        }}
      >
        Групповые рабочие диапазоны <ChevronIconRight />
      </Panel>
      <Panel
        onClick={() => {
          history(`${WorkingRangeType.Unique}`);
        }}
      >
        Уникальные рабочие диапазоны <ChevronIconRight />
      </Panel>
    </Wrapper>
  );
};
