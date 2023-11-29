import React, { FC } from 'react';
import { ChevronIconRight, Panel, Wrapper } from './WorkingRangeTab.styled';
import {
  WorkingRangeTabProps,
  WorkingRangeType,
} from './WorkingRangeTab.types';
import {  useNavigate } from 'react-router-dom';

export const WorkingRangeTab: FC<WorkingRangeTabProps> = () => {
  const history =  useNavigate();

  return (
    <Wrapper>
      <Panel
        onClick={() => {
           history(`operatingRanges/${WorkingRangeType.Standart}`);
        }}
      >
        Стандартные рабочие диапазоны <ChevronIconRight />
      </Panel>
      <Panel
        onClick={() => {
           history(`operatingRanges/${WorkingRangeType.Group}`);
        }}
      >
        Групповые рабочие диапазоны <ChevronIconRight />
      </Panel>
      <Panel
        onClick={() => {
           history(`operatingRanges/${WorkingRangeType.Unique}`);
        }}
      >
        Уникальные рабочие диапазоны <ChevronIconRight />
      </Panel>
    </Wrapper>
  );
};
