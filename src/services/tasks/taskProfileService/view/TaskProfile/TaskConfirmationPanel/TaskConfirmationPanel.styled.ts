import styled from 'styled-components';

export const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #272f5a;
`;

export const Wrapper = styled.div`
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  padding: 15px;
  margin-top: 5px;
`;

export const PanelInfoWrapper = styled.div`
  margin-top: 15px;

  &:first-child {
    margin-top: 0;
  }
`;

export const PanelInfoLable = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const PanelInfoText = styled.div`
  color: #272f5a;
  font-weight: 400;
  font-size: 16px;
`;
