import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  padding: 15px;
  transition: 0.2s;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #00000000;

  &:hover {
    border-color: #e0e0e0;
  }
`;

export const Address = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #272f5a;
`;

export const AdditionalAddress = styled.span`
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
`;

export const NumberOfTasks = styled.span`
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
`;
