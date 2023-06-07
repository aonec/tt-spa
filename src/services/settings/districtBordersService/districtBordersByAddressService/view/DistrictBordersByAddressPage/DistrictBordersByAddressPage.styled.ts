import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Wrapper = styled.div`
  margin-top: 12px;
  margin: 0 30px;
`;

export const AddressSortWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

export const Footerwrapper = styled.div`
  position: relative;
  height: 80px;
`;

export const Panel = styled.div`
  position: fixed;
  bottom: 0px;
  height: 80px;
  left: 208px;
  width: calc(100% - 208px);
  background-color: #ffffff;
  box-shadow: 0px -4px 8px rgba(78, 93, 146, 0.16);
  gap: 16px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 56px;
`;

export const ButtonSC = styled(Button)`
  width: 200px;
`;