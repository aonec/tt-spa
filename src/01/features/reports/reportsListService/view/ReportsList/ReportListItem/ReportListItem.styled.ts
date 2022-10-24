import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 15px 5px;
  display: grid;
  grid-gap: 0 15px;
  grid-template-columns: 3fr 1fr 0.5fr;
  align-items: center;
`;

export const ReportName = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 16px;
`;

export const ReportDate = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(39, 47, 90, 0.7);
`;

export const ContextMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
