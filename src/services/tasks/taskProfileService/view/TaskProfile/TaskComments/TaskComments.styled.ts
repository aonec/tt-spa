import { InputSC as Input } from '01/shared/ui/Fields';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 24px;
  width: 100%;
`;

export const TitleWrapper = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #272f5a;
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid;

  display: flex;
  align-items: center;
  justify-content: center;

  border-color: #f3f5f6;
  background-color: #f3f5f6; ;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const InputSC = styled(Input)`
  margin-left: 16px;
  margin-right: 0px !important;
  overflow-x: hidden;
  word-wrap: normal;
`;

export const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;
