import moment from 'moment';
import React, { FC, useMemo } from 'react';
import {
  ActNumber,
  DateWrapper,
  DocumentIconSC,
  DocumentIconWrapper,
  DocumentName,
  DocumentNameText,
  DocumentType,
  DocumentTypeText,
  ListItem,
  ManageIconsWrapper,
  NoDocumentText,
} from './ApartmentActItem.styled';
import { ApartmentActItemProps } from './ApartmentActItem.types';
import { DocumentIcon, PencilIcon, TrashIcon, UploadIcon } from '../../../../../ui-kit/icons';
import { ResourceInfo } from '../../../../../ui-kit/shared_components/ResourceInfo';
import { DocumentResponse } from '../../../../../api/types';

export const ApartmentActItem: FC<ApartmentActItemProps> = ({
  act,
  openDeleteActModal,
  openEditActModal,
  saveFile,
  actTypes,
}) => {
  const {
    actJobDate,
    id,
    actType,
    actResourceType,
    registryNumber,
    document,
  } = act;

  const actTypeText = useMemo(
    () => actTypes?.find(({ key }) => key === actType)?.value || actType,
    [actType, actTypes]
  );

  const documentName = document?.name || (
    <NoDocumentText>Нет документа</NoDocumentText>
  );

  return (
    <ListItem>
      <DateWrapper>{moment(actJobDate).format('DD.MM.YYYY')}</DateWrapper>
      <ActNumber>{registryNumber}</ActNumber>

      <DocumentName>
        <DocumentIconWrapper>
          <DocumentIcon />
        </DocumentIconWrapper>

        <DocumentNameText>{documentName}</DocumentNameText>
      </DocumentName>

      <ResourceInfo resource={actResourceType} />

      <DocumentType>
        <DocumentTypeText>{actTypeText}</DocumentTypeText>
        <ManageIconsWrapper>
          <DocumentIconSC onClick={() => openEditActModal(act)}>
            <PencilIcon />
          </DocumentIconSC>

          <DocumentIconSC onClick={() => openDeleteActModal(id)}>
            <TrashIcon />
          </DocumentIconSC>
          <DocumentIconSC
            onClick={() => saveFile(document as DocumentResponse)}
          >
            <UploadIcon />
          </DocumentIconSC>
        </ManageIconsWrapper>
      </DocumentType>
    </ListItem>
  );
};
