import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { PencilIcon, CloseIcon } from 'ui-kit/icons';

export const Wrapper = styled.div``;

export const Footer = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: space-between;
`;

export const ButtonPadding = styled.div`
  padding: 0 20px;
`;

export const RightButtonBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
`;

export const AddTPButton = styled.div`
  margin-top: 42px;
  cursor: pointer;
  color: #189ee9;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
`;

export const InputTypeDisplayingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-radius: 4px;
  border: 1px solid #dcdee4;
  background-color: rgba(39, 47, 90, 0.04);
  margin-bottom: 20px;
`;

export const CloseIconSC = styled(CloseIcon)`
  path {
    fill: #272f5a52;
  }
  margin: 0px 14px;
  cursor: pointer;
  transition: 0.15s;
  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(0.9);
  }
`;

export const PencilIconSC = styled(PencilIcon)`
  cursor: pointer;
  margin: 0px 4px;
  transition: 0.15s;
  :hover {
    path {
      fill: #272f5a52;
    }
  }
  :active {
    path {
      transform: scale(0.95);
    }
  }
`;

export const FlexEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0px 8px;
`;

export const FlexStart = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 16px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  color: #272f5a;
`;

export const Subtitle = styled.div`
  margin-left: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const WrapperLinkButton = styled.div`
  width: max-content;
  margin-top: 45px;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;
