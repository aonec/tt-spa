import styled from 'styled-components';
import { TrashIcon } from 'ui-kit/icons';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TrashIconSC = styled(TrashIcon)`
  path {
    fill: red !important;
  }
`;

export const ColorCircle = styled.div<{
  fillColor: string;
  strokeColor: string;
}>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: ${({ fillColor }) => fillColor};
  border: 3px solid ${({ strokeColor }) => strokeColor};
`;

export const DeleteDistrictText = styled.span`
  color: red;
`;
