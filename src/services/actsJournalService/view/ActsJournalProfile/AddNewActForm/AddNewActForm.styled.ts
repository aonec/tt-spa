import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { actsJournalColumnsGridTemplate } from '../ActsJournalProfile.constants';

export const ButtonSC = styled(Button)`
  padding: 5px 40px;
  margin-left: 16px;
`;

export const ButtonsWrapper = styled.div`
  padding: 16px 0 16px 16px;
  display: flex;
  justify-content: flex-end;

  border-bottom: 2px solid #f3f3f3;
`;

export const Wrapper = styled.div`
  margin-top: 16px;

  display: grid;
  align-items: center;
  grid-template-columns: ${actsJournalColumnsGridTemplate};
  grid-gap: 16px;

  padding: 0 0 0 16px;
`;

export const ActDate = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: bold;
  font-size: 14px;
`;
