import React from 'react';
import styled from 'styled-components';

export const Title = styled.div`
  margin: 16px 0 16px;
  font-weight: 500;
  color: rgba(39, 47, 90, 1);
  font-size: 20px;
`;

export const Wrapper = styled.div`
  background: rgba(24, 158, 233, 0.08);
  padding: 12px 19px;
  margin: 10px 0 15px;
  border-radius: 8px;
`;

const BlockWrap = styled.div`
  margin-right: 60px;
`;

const BlockTitle = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-size: 14px;
`;

const BlockValue = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: 500;
  font-size: 14px;
  margin-top: 6px;
`;

export const Block = ({ title, value }: { title: string; value: string }) => {
  return (
    <BlockWrap>
      <BlockTitle>{title}:</BlockTitle>
      <BlockValue>{value}</BlockValue>
    </BlockWrap>
  );
};
