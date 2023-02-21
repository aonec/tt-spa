import { InputSC } from '01/shared/ui/Fields';
import styled, { keyframes } from 'styled-components';
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
  padding: 16px;
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const SearchInput = styled(InputSC)`
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
  margin-top: 8px;
  animation-duration: 0.2s;
  animation-name: ${slideDown};
`;
