import { Skeleton } from 'antd';
import React from 'react';
import { DateIcon } from 'ui-kit/icons';
import {
  DocumentDate,
  DocumentDateWrapper,
  DocumentIconSC,
  DocumentName,
  DocumentNameWrapper,
  ManageButtonsWrapper,
  Wrapper,
} from './DocumentItem.styled';

export const DocumentItemLoader = () => {
  return (
    <Wrapper>
      <DocumentNameWrapper>
        <DocumentIconSC />
        <DocumentName>
          <Skeleton.Button
            style={{ width: 180, height: 26 }}
            active
            shape="square"
            size="large"
          />
        </DocumentName>
      </DocumentNameWrapper>
      <DocumentDateWrapper>
        <DateIcon />
        <DocumentDate>
          <Skeleton.Button
            style={{ width: 100, height: 26 }}
            active
            shape="square"
          />
        </DocumentDate>
      </DocumentDateWrapper>
      <ManageButtonsWrapper>
        <Skeleton.Avatar active size="small" />
      </ManageButtonsWrapper>
    </Wrapper>
  );
};
