import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px 16px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ColumnTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const PlatesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px 16px;
`;

export const Plate = styled.div`
  display: flex;
  align-items: center;
  padding-left: 24px;

  background: #f3f5f6;
  border: 1px solid #dcdee4;
  border-radius: 4px;
  height: 48px;

  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: rgba(39, 47, 90, 0.9);
`;

export const NodeNumber = styled.div`
  margin-left: 8px;
`;
