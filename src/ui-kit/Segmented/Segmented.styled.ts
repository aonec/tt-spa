import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const SegmentItem = styled.div<{ isActive?: boolean }>`
  padding: 0 15px;
  height: 32px;
  display: flex;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  color: ${({ isActive }) => (isActive ? '#189ee9' : '#252f5a')};
  border: 1px solid ${({ isActive }) => (isActive ? '#189ee9' : '#dcdee4')};
  path {
    fill: ${({ isActive }) => (isActive ? '#189ee9' : '#252f5a')};
  }

  &:hover {
    border-color: #189ee9;
    color: #189ee9 !important;

    path {
      fill: #189ee9;
    }
  }
`;

export const SegmentTitle = styled.div`
  margin-left: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;
