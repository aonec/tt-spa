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
