import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { Input } from 'ui-kit/Input';

export const TitleWrapper = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #272f5a;
  margin: 22px 0px;
`;

export const ButtonSC = styled(Button)`
  margin-top: 32px;
`;

export const TextareaSC = styled(Input.TextArea)`
  resize: none !important;
  padding: 12px 16px;
`;
