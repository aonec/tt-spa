import React, { FC } from 'react';
import {
  SkeletonSC,
  ListWrapper,
  Wrapper,
  Header,
  Title,
  LinkButton,
} from './ApartmentActsJournal.styled';
import { Props } from './ApartmentActsJournal.types';
import { Skeleton } from 'antd';
import { DocumentIcon } from 'ui-kit/icons';

export const ApartmentActsJournal: FC<Props> = ({
  apartmentActs,
  isLoading,
  apartmentId,
}) => {
  return (
    <Wrapper>
      <Header>
        <Title>Журнал актов</Title>
        <LinkButton to={`/apartments/${apartmentId}/actsJournal`}>
          <DocumentIcon />
          Перейти в журнал актов
        </LinkButton>
      </Header>
      {isLoading && (
        <div>
          <Skeleton.Input size="small" />
          <ListWrapper>
            <SkeletonSC active />
            <SkeletonSC active />
            <SkeletonSC active />
          </ListWrapper>
        </div>
      )}
    </Wrapper>
  );
};
