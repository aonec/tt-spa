import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 480px;
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 26px;
  justify-content: flex-end;
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

export const PageTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  margin-bottom: 10px;
`;

export const HouseManagementWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
`;
