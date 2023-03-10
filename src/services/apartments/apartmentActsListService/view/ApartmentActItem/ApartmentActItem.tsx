import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { DocumentIcon, PencilIcon, TrashIcon, UploadIcon } from 'ui-kit/icons';
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
import { DocumentResponse } from 'myApi';

export const ApartmentActItem: FC<ApartmentActItemProps> = ({
  act,
  openDeleteActModal,
  openEditActModal,
  saveFile,
  actTypes,
  isPermitionToChangeApartmentAct,
}) => {
  const { actJobDate, id, actType, actResourceType, registryNumber, document } =
    act;

  const actTypeText = useMemo(
    () => actTypes?.find(({ key }) => key === actType)?.value || actType,
    [actType, actTypes],
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
      </DocumentType>
    </ListItem>
  );
};
