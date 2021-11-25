import { Grid } from '01/shared/ui/Layout/Grid';
import React, { FC } from 'react';
import styled from 'styled-components';
import { MayBe } from '../actsJournal/displayActsJournal/models';

interface Props {
  apartmentId?: MayBe<number>;
  onChange?(id: number): void;
}

export const AddressSearch: FC<Props> = () => {
  return <SearchWrap temp="1fr 0.5fr 0.5fr"></SearchWrap>;
};

const SearchWrap = styled(Grid)`
  color: #333333;
  border: 1px solid lightgray;
  padding: 3px 15px;
  transition: 0.2s;

  &:last-child {
    margin-right: 10px;
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 4px 8px #188fff52;
  }
`;
