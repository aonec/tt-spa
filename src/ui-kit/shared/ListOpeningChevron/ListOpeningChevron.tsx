import React, { FC } from 'react';
import {
  ChevronSC,
  ChevronWrapper,
  LinkChevronSC,
} from './ListOpeningChevron.styled';
import { ListOpeningChevronProps } from './ListOpeningChevron.types';

export const ListOpeningChevron: FC<ListOpeningChevronProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <ChevronWrapper onClick={onClick}>
      <ChevronSC isOpen={isOpen} />
    </ChevronWrapper>
  );
};

export const LinkChevron: FC = () => {
  return (
    <ChevronWrapper>
      <LinkChevronSC />
    </ChevronWrapper>
  );
};
