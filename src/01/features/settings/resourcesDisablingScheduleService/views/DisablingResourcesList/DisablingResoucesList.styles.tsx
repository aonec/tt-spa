import { Grid } from '01/shared/ui/Layout/Grid';
import styled from 'styled-components';

export const DisablingResourceWrapperContainer = styled.div`
  max-width: 960px;
`;

export const TimeElement = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledTextElement = styled.span`
  p {
    margin-bottom: 1px;
    overflow: hidden;
    white-space: nowrap;
    max-width: 110px;
    text-overflow: ellipsis;
  }
`;

export const StyledLinkTypeElement = styled(StyledTextElement)`
  display: inline-block;
  padding-bottom: 1px;
  cursor: pointer;

  p {
    margin-bottom: 0px;
    line-height: 15px;
    border-bottom: 1px solid black;
    &:hover {
      color: #189EE9;
      border-bottom: 1px solid #189EE9;
    }
  }
`;

export const StyledFontLarge = styled.span`
  font-weight: 500;
  margin-right: 5px;
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: '3.2fr 0.01fr 1.4fr 0.01fr 0.8fr 0.01fr 0.5fr 0.01fr 1.1fr 0.01fr 1.3fr 0.1fr 0.2fr';
  gap: 10px;
  align-items: center;
  background-color: #f3f5f6;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
  padding: 10px 20px;
  height: 49px;
`;