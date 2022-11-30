import styled from 'styled-components';
import { CrownIcon, PencilIcon, TrashIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  max-width: 616px;
`;

export const Name = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 16px;
`;

export const PersonalAccountNumber = styled.div`
  display: flex;
  align-items: center;
  color: #272f5ab2;
  font-weight: 400;
  font-size: 14px;
`;

export const PaymentCode = styled.div`
  color: #272f5ab2;
  font-weight: 400;
  font-size: 14px;
`;

export const IconsWrapper = styled.div`
  width: 36px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  justify-self: end;
`;

export const CrownIconSC = styled(CrownIcon)`
  margin-left: 8px;
  transform: translateY(-1px);
`;

export const LinkButtonWrapper = styled.div`
  margin-top: 25px;
`;

export const PencilIconSC = styled(PencilIcon)`
  cursor: pointer;
`;

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
`;
