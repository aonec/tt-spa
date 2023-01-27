import styled from 'styled-components';

export const Wrapper = styled.li`
  display: grid;
  max-width: 1000px;
  grid-template-columns: 2.5fr 1.7fr 1.5fr 1fr;
  align-items: center;
  padding: 8px 0 8px 8px;
  margin-bottom: 8px;
`;

export const Name = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

export const Contacts = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;
