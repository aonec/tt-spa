import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 1200px;
`;

export const IntegrationPanel = styled.div`
  box-shadow: 0px 8px 16px 0px #4e5d9214;
  box-shadow: 0px 4px 4px 0px #4e5d9229;

  padding: 16px;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IntegrationPanelTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
`;

export const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  gap: 16px;
`;
