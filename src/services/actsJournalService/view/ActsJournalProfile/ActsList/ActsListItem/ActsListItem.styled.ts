import styled from 'styled-components';
import { actsJournalColumnsGridTemplate } from '../../ActsJournalProfile.constants';

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${actsJournalColumnsGridTemplate};
  grid-gap: 16px;

  height: 48px;
  padding: 0 0 0 16px;
  border-bottom: 1px solid #f3f3f3;

  &:last-child {
    border-bottom: none;
  }
`;

export const ActDate = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: bold;
  font-size: 14px;
`;
