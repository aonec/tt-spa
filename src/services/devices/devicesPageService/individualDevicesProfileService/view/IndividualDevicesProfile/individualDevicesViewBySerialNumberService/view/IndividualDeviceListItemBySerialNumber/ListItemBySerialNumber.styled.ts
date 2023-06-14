import styled from 'styled-components';

export const Wrapper = styled.div<{ isDeviceOpen: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 1.5fr 0.7fr;
  grid-gap: 15px;

  width: 100%;
  height: 48px;
  padding: 8px 10px;
  margin-top: 4px;
  position: relative;
  cursor: pointer;

  &:first-child {
    margin-top: 0px;
  }

  ${({ isDeviceOpen }) =>
    isDeviceOpen && `box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16);`}

  &:hover {
    box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16);
  }
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ContextMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SerialNumberWrapper = styled.div`
  margin-left: 22px;
  color: #272f5a;
  font-weight: 500;
  font-size: 16px;
`;

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;

  color: #272f5ae5;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HomeownerWrapper = styled.div`
  color: #272f5ae5;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HomeownerAccountNumber = styled.div`
  color: rgba(39, 47, 90, 0.6);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
  width: 100%;
  max-width: 100px;
  margin-right: 35px;
`;
