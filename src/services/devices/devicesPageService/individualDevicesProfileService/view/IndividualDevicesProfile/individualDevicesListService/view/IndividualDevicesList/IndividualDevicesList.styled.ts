import styled from 'styled-components';

export const Wrapper = styled.div``;

export const individualDeviceGrid = '0.7fr 0.3fr 0.3fr 0.3fr 0.26fr 0.4fr';

export const Header = styled.div`
  height: 50px;
  padding: 0 25px;
  background: #f3f5f6;
  display: grid;
  grid-gap: 0 15px;
  align-items: center;
  grid-template-columns: ${individualDeviceGrid};
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
