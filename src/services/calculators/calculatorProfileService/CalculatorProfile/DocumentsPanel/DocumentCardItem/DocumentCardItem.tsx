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
import moment from 'moment';

export const DocumentCardItem: FC<DocumentCardItemProps> = ({ document }) => {
  const { url, name, uploadingTime } = document;

  const formatedUploadingTime = moment(uploadingTime).format('DD.MM.YYYY');

  const handleDownloadFile = () => {
    if (url && name) {
      saveAs(url, name);
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