import styled from 'styled-components';
import { actsJournalColumnsGridTemplate } from '../ActsJournalProfile.constants';
import { SortButton } from './SortButton';

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${actsJournalColumnsGridTemplate};
  grid-gap: 16px;

  height: 48px;
  padding: 0 0 0 16px;

  background: #f3f5f6;

  user-select: none;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;

export const SortButtonSC = styled(SortButton)`
  margin-right: 16px;
`;
