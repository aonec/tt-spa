import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { DocumentIcon, PencilIcon, TrashIcon, UploadIcon } from 'ui-kit/icons';
import {
  ActNumber,
  Comment,
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
import { DocumentResponse } from 'api/types';
import { ActTypesNamesLookup } from 'dictionaries';

export const ApartmentActItem: FC<ApartmentActItemProps> = ({
  act,
  openDeleteActModal,
  openEditActModal,
  saveFile,
  isPermitionToChangeApartmentAct,
}) => {
  const {
    actJobDate,
    id,
    actType,
    actResourceType,
    registryNumber,
    document,
    comment,
  } = act;

  const actTypeText = ActTypesNamesLookup[actType];

  const documentName = document?.name || (
    <NoDocumentText>Нет документа</NoDocumentText>
  );

  return (
    <ListItem>
      <DateWrapper>{dayjs(actJobDate).format('DD.MM.YYYY')}</DateWrapper>
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
 
      </DocumentType>

      <Comment>{comment}</Comment>

      <ManageIconsWrapper>
          {isPermitionToChangeApartmentAct && (
            <DocumentIconSC onClick={() => openEditActModal(act)}>
              <PencilIcon />
            </DocumentIconSC>
          )}

          {isPermitionToChangeApartmentAct && (
            <DocumentIconSC onClick={() => openDeleteActModal(id)}>
              <TrashIcon />
            </DocumentIconSC>
          )}
          <DocumentIconSC
            onClick={() => saveFile(document as DocumentResponse)}
          >
            <UploadIcon />
          </DocumentIconSC>
        </ManageIconsWrapper>
    </ListItem>
  );
};
