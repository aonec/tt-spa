import styled, { keyframes } from 'styled-components';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { CloseIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 352px;
  min-height: 64px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  max-height: calc(84vh - 64px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;

  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 1;
`;

export const SearchInput = styled(AutoComplete)`
  width: 100%;
  margin: 0 !important;
`;

export const CloseIconSC = styled(CloseIcon)`
  transform: translateY(2px);
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ExtendedFiltration = styled.div`
  animation-duration: 0.2s;
  animation-name: ${slideDown};
  padding: 0 16px 16px 16px;
`;

export const Footer = styled.div`
  background: #f3f5f6;
  border-radius: 0 0 4px 4px;
  padding: 16px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  position: sticky;
  bottom: 0px;
`;
