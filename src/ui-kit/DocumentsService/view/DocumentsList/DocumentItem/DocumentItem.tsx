import React, { FC, useCallback, useMemo } from 'react';
import { saveDocument } from 'ui-kit/DocumentsService/DocumentsService.api';
import { DateIcon } from 'ui-kit/icons';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
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
import axios from '01/axios';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

export const DocumentItem: FC<DocumentItemProps> = ({
  document,
  removeDocument,
}) => {
  const documentDate = useMemo(
    () => getTimeStringByUTC(document.uploadingTime),
    [document.uploadingTime],
  );

  const handleRemoveDocument = useCallback(
    () => removeDocument && removeDocument(document.id),
    [document.id, removeDocument],
  );

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
        {removeDocument && (
          <TrashIconSC
            onClick={async () => {
              try {
                await axios.delete(`Documents/${document.id}`);
              } catch (error) {
                if (
                  (error as unknown as EffectFailDataAxiosError).response
                    .status === 403
                ) {
                  message.error(
                    'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
                  );
                }
              }
              handleRemoveDocument();
            }}
          />
        )}
      </ManageButtonsWrapper>
    </Wrapper>
  );
};
