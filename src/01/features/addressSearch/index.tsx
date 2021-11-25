import { Grid } from '01/shared/ui/Layout/Grid';
import React, { FC } from 'react';
import styled from 'styled-components';
import { MayBe } from '../actsJournal/displayActsJournal/models';

interface Props {
  apartmentId?: MayBe<number>;
  onChange?(id: number): void;
}

export const AddressSearch: FC<Props> = () => {
  return <Wrap temp="1fr 0.5fr 0.5fr"></Wrap>;
};

const Wrap = styled(Grid)``;
