import { accountingNodesReadingsListTemplate } from 'services/meters/metersService/AccountingNodesReadingsService/view/AccountingNodesList/AccountingNodesListHeader/AccountingNodesListHeader.styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${accountingNodesReadingsListTemplate};
  grid-gap: 16px;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid #dcdee4;
`;

export const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const DeviceSerialNumberWrapper = styled.div`
  margin-left: 8px;
  font-weight: 500;
`;

export const DeviceModelWrapper = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-self: flex-start;
`;
