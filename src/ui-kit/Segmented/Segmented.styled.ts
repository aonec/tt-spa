import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const SegmentItem = styled.div<{ isActive?: boolean }>`
  padding: 0 12px;
  gap: 10px;
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

  rect {
    stroke: ${({ isActive }) => (isActive ? '#189ee9' : '#252f5a')};
  }

  &:hover {
    border-color: #189ee9;
    color: #189ee9 !important;

    box-shadow: 0 3px 7px #189ee945;

    path {
      fill: #189ee9;
    }

    rect {
      stroke: #189ee9;
    }
  }
`;

export const SegmentTitle = styled.div<{ bold?: boolean }>`
  /* margin-left: 10px; */
  font-weight: ${({ bold }) => (bold ? '500' : '400')};
  font-size: 14px;
  line-height: 16px;
  white-space: nowrap;
`;
