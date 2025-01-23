import styled from 'styled-components';
import { DownloadIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DownloadIconSC = styled(DownloadIcon)`
  cursor: pointer;
`;
