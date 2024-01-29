import React, { FC } from 'react';
import {
  ActInfo,
  ActLink,
  ActName,
  Header,
  Wrapper,
  ellipse,
} from './ApartmentActItem.styled';
import { Props } from './ApartmentActItem.types';
import dayjs from 'dayjs';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { ActTypesNamesLookup } from 'dictionaries';
import { DocumentResponse } from 'api/types';

export const ApartmentActItem: FC<Props> = ({ act, handleSaveFile }) => {
  return (
    <Wrapper>
      <Header>
        <div>№{act.registryNumber}</div>
        {ellipse}
        <div>{dayjs(act.actDateTime).format('DD.MM.YYYY')}</div>
      </Header>
      <ActInfo>
        <ActName>
          <ResourceIconLookup resource={act.actResourceType} />
          <div>{ActTypesNamesLookup[act.actType]}</div>
        </ActName>
        {act.document && (
          <ActLink
            onClick={() => handleSaveFile(act.document as DocumentResponse)}
          >
            {'Перейти >'}
          </ActLink>
        )}
      </ActInfo>
    </Wrapper>
  );
};
