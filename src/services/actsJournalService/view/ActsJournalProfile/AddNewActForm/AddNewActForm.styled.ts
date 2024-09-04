import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { actsJournalColumnsGridTemplateWithoutComment } from '../ActsJournalProfile.constants';
import { Input } from 'ui-kit/Input';

export const ButtonSC = styled(Button)`
  padding: 5px 40px;
  margin-left: 16px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 50px;
`;

export const Wrapper = styled.div`
  margin-top: 16px;
  display: grid;
  align-items: center;
  grid-template-columns: ${actsJournalColumnsGridTemplateWithoutComment};
  grid-gap: 16px;

  padding: 0 0 0 16px;
`;

export const ActDate = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: bold;
  font-size: 14px;
`;

export const Comment = styled(Input.TextArea)`
  border: 1px solid #dcdee4;
  border-radius: 4px;
  margin-top: 12px;
  margin-left: 108px;

  width: 335px;
  height: 34px;
`;

export const BottomBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 2px solid #f3f3f3;
`;
