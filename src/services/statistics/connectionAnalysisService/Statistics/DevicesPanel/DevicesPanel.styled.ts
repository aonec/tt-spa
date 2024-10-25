import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 64px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  margin-top: 5px;

  &:first-child {
    margin-top: 0;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 16px;
  color: #272f5ab2;
  font-weight: 500;
`;

export const RighContentWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const DevicesAmount = styled.div`
  color: #272f5ab2;
  font-weight: 400;
  font-size: 16px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
