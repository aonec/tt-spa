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
  color: #272f5ad1;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding: 16px;
`;

export const MagistralLabel = styled.span`
  opacity: 0.75;
`;

export const PipeNumber = styled.span`
  font-weight: 500;
  color: #272f5a;
`;
