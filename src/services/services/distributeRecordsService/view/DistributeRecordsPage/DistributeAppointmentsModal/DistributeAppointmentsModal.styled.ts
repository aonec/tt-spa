import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;

  .ant-form-item {
    width: 100%;
  }
`;

export const LinkButtonWrapper = styled.div`
  transform: translateY(8px);
`;
