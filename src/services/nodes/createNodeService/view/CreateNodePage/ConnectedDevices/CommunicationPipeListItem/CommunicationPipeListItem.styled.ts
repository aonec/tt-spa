import styled from 'styled-components';

export const Wrapper = styled.div`
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

export const MagistralLabel = styled.span`
  margin-left: 8px;
  opacity: 0.8;
  font-weight: 400;
`;

export const PipeNumber = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #272f5a;
`;

export const DiameterLabel = styled.span`
  opacity: 0.8;
  font-weight: 400;
`;

export const RighContentWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
