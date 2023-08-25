import styled from 'styled-components';
import { DownloadIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 64px;
  padding: 16px;
  margin-top: 4px;
  box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16);
  position: relative;
  z-index: 2;
  &:first-child {
    margin-top: 0px;
  }
  .clickable {
    cursor: pointer;
  }
`;

export const AddressWrapper = styled.div<{ isActive: boolean }>`
  font-weight: 500;
  font-size: 16px;
  color: ${({ isActive }) => (isActive ? '#189EE9' : '#272f5a')};

  margin-left: 16px;
  transition: 0.2s;
  user-select: none;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AppartmentNumberText = styled.div`
  color: #272f5ab2;
  font-size: 16px;
`;

export const DownloadIconWrapper = styled.div`
  margin-left: 16px;
`;

export const DownloadIconSC = styled(DownloadIcon)`
  transition: 0.2s;
  :hover {
    path {
      fill: #189ee9;
    }
  }
`;
