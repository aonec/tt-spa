import styled from 'styled-components';

export const Wrapper = styled.li`
  display: grid;
  max-width: 1000px;
  grid-template-columns: 2.5fr 1.7fr 1.5fr 1fr 0fr;
  align-items: center;
  padding: 8px 0 8px 8px;
  margin-bottom: 8px;
`;

export const Name = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
`;

export const Role = styled.div`
  color: #272f5ab2;
  font-size: 14px;
  line-height: 16px;
`;

export const Cellphone = styled.div`
  color: #272f5ab2;
  font-size: 14px;
  line-height: 16px;
`;
