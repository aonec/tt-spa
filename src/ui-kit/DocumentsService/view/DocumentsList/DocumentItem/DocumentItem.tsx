import { FC, useCallback, useMemo } from 'react';
import { saveDocument } from '../../../../../ui-kit/DocumentsService/DocumentsService.api';
import { DateIcon } from '../../../../../ui-kit/icons';
import { getTimeStringByUTC } from '../../../../../utils/getTimeStringByUTC';
import {
  DocumentDate,
  DocumentDateWrapper,
  DocumentIconSC,
  DocumentName,
  DocumentNameWrapper,
  ManageButtonsWrapper,
  TrashIconSC,
  DownloadIconSC,
  Wrapper,
} from './DocumentItem.styled';
import { DocumentItemProps } from './DocumentItem.types';

export const DocumentItem: FC<DocumentItemProps> = ({
  document,
  removeDocument,
}) => {
  const documentDate = useMemo(
    () => getTimeStringByUTC(document.uploadingTime),
    [document.uploadingTime]
  );

  const handleRemoveDocument = useCallback(() => removeDocument(document.id), [
    document.id,
    removeDocument,
  ]);

  const handleSaveDocument = useCallback(() => {
    saveDocument(document);
  }, [document]);

  return (
    <Wrapper>
      <DocumentNameWrapper>
        <DocumentIconSC />
        <DocumentName>{document.name}</DocumentName>
      </DocumentNameWrapper>
      <DocumentDateWrapper>
        <DateIcon />
        <DocumentDate>{documentDate}</DocumentDate>
      </DocumentDateWrapper>
      <ManageButtonsWrapper>
        <DownloadIconSC onClick={handleSaveDocument} />
        <TrashIconSC onClick={handleRemoveDocument} />
      </ManageButtonsWrapper>
    </Wrapper>
  );
};
