import styled from 'styled-components';

export const PageHeaderWrapper = styled.div`
  margin-top: 16px;
`;

export const SearchWrapper = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 16px;
`;

export const TableWrapper = styled.div`
  margin-top: 32px;
`;

export const DownloadButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #189ee9;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #186ce9ff;

    svg {
      path {
        fill: #186ce9ff;
      }
    }
  }
`;

export const EmptyWrapper = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const EmptyTitle = styled.div`
  margin-top: 16px;
  color: rgba(39, 47, 90, 0.32);
  font-size: 24px;
  font-weight: 500;
`;

export const EmptyDescription = styled.div`
  margin-top: 16px;
  color: rgba(39, 47, 90, 0.32);
  text-align: center;
  font-size: 16px;
  max-width: 500px;
`;
