import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { DocumentIcon, PencilIcon, TrashIcon } from 'ui-kit/icons';
import {
  DateWrapper,
  DocumentIconSC,
  DocumentIconWrapper,
  DocumentName,
  DocumentNameText,
  DocumentType,
  DocumentTypeText,
  ListItem,
  ManageIconsWrapper,
} from './ApartmentActItem.styled';
import { ApartmentActItemProps } from './ApartmentActItem.types';

export const ApartmentActItem: FC<ApartmentActItemProps> = ({
  act: { actJobDate, id, actType, actResourceType, registryNumber, document },
  openDeleteActModal,
  actTypes,
}) => {
  const actTypeText = useMemo(
    () => actTypes?.find(({ key }) => key === actType)?.value,
    [actType, actTypes]
  );

  return (
    <ListItem>
      <DateWrapper>{moment(actJobDate).format('DD.MM.YYYY')}</DateWrapper>
      <div>{registryNumber}</div>

      <DocumentName>
        <DocumentIconWrapper>
          <DocumentIcon />
        </DocumentIconWrapper>

        <DocumentNameText>
          {document ? document.name : 'Нет документа'}
        </DocumentNameText>
      </DocumentName>

      <ResourceInfo resource={actResourceType} />

      <DocumentType>
        <DocumentTypeText>{actTypeText}</DocumentTypeText>
        <ManageIconsWrapper>
          <DocumentIconSC>
            <PencilIcon />
          </DocumentIconSC>

          <DocumentIconSC onClick={() => openDeleteActModal(id)}>
            <TrashIcon />
          </DocumentIconSC>
        </ManageIconsWrapper>
      </DocumentType>
    </ListItem>
  );
};
