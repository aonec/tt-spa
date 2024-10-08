import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const InfoWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 0.4fr;
  grid-column-gap: 16px;
`;

export const AddZoneText = styled.div`
  display: flex;
  align-items: center;
  color: rgb(24, 158, 233);
  height: 48px;
  margin-left: 16px;
  font-weight: 500;
  font-size: 16px;

  cursor: pointer;
`;

export const ZoneWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
`;

export const ResourceText = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const ButtonSC = styled(Button)`
  margin-left: 16px;
`;

export const ZoneOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
