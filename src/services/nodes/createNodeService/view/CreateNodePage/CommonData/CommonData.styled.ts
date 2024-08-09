import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const FirstLineWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const SecondLineWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #dcdee4;
  margin: 24px 0;
`;

export const CreateNewZoneButtonWrapper = styled.div`
  display: flex;
  margin: 45px 0 0 25px;
`;

export const SelectOptionWithIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;

export const ZoneOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
