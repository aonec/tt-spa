import React, { FC } from 'react';
import {
  BottomInfoWrapper,
  LinkWrapper,
  NameWrapper,
  NumberWrapper,
  Wrapper,
} from './DocumentCardItem.styled';
import { DocumentCardItemProps } from './DocumentCardItem.types';
import { saveAs } from 'file-saver';
import dayjs from 'api/dayjs';

export const DocumentCardItem: FC<DocumentCardItemProps> = ({
  document,
  saveFile,
}) => {
  const { url, name, uploadingTime } = document;

  const formatedUploadingTime = dayjs(uploadingTime).format('DD.MM.YYYY');

  const handleDownloadFile = () => {
    if (url && name) {
      saveAs(url, name);
    } else {
      saveFile(document);
    }
  };

  return (
    <Wrapper>
      <NameWrapper>{name}</NameWrapper>
      <BottomInfoWrapper>
        <NumberWrapper>{formatedUploadingTime}</NumberWrapper>
        {url && (
          <LinkWrapper onClick={() => handleDownloadFile()}>
            {'Перейти >'}
          </LinkWrapper>
        )}
      </BottomInfoWrapper>
    </Wrapper>
  );
};
