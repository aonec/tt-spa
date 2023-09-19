import styled from 'styled-components';
import { TrashIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  padding: 0 0 16px;
`;

export const DisconnectionWrapper = styled.div`
  max-width: 500px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
`;
