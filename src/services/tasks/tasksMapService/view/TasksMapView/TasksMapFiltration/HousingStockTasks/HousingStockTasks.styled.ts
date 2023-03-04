import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const HousingStockWrapper = styled.div`
  border-top: 1px solid #f3f5f6;
  padding: 16px 16px 0 16px;
  max-height: 560px;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
`;

export const Address = styled.div`
  font-weight: 600;
  color: rgba(39, 47, 90, 0.9);
  font-size: 16;
`;

export const City = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 12px;
  color: rgba(39, 47, 90, 0.6);
`;

export const ChevronIconSC = styled(ChevronIcon)`
  transform: translateY(3px);
  cursor: pointer;
`;

export const TaskItem = styled.div`
  border-top: 1px solid #f3f5f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 8px 16px 0;
  cursor: pointer;

  &:hover {
    * {
      color: #189ee9 !important;
    }

    .chevron-icon-right {
      transform: rotate(180deg) translateX(-8px);
    }
  }
`;

export const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  transition: 0.2s;
`;

export const TaskTitle = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-weight: 500;
  font-size: 16px;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChevronRightIcon = styled(ChevronIcon)`
  transform: rotate(180deg);
  transition: 0.2s;
`;
