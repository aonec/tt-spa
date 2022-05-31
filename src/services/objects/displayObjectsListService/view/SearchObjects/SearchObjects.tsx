import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { Wrapper } from './SearchObjects.styled';
import { SearchObjectsProps } from './SearchObjects.types';

export const SearchObjects: FC<SearchObjectsProps> = ({}) => {
  return <Wrapper>
    <AddressSearchContainer />
  </Wrapper>
};
