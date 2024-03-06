import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 16px;

  margin-bottom: 20px;

  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const TemperatureValue = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TemperatureDevider = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-size: 14px;
  font-weight: 900;
  line-height: 16px;
`;

export const TemperatureBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ButtonSc = styled(Button)`
  padding: 0px 10px;
`;
