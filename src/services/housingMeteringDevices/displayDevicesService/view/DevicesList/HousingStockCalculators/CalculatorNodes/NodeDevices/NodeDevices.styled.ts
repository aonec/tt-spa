import styled from 'styled-components';

export const MeteringDeviceWrapper = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 3fr 1.5fr 2fr 1fr;
  margin-bottom: 24px;
  margin-left: 24px;
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  margin-left: 24px;
  display: flex;
  align-items: center;
`;

export const ServiceZone = styled.span`
  font-size: 16px;
  line-height: 2;
  color: var(--main-70);
`;

export const CommercialAct = styled.div`
  font-size: 12px;
  color: var(--main-70);
  padding-left: 48px;
`;

export const Diameter = styled.div`
  margin: 0 auto;
`;
