import { Grid } from '01/shared/ui/Layout/Grid';
import styled from 'styled-components';

export const ApartmentWrap = styled(Grid)`
  padding: 10px 20px;
  border-bottom: 1px solid #f3f5f6;
  transition: 0.2s;

  &:hover {
    background-color: #F3FAFE;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Wrap = styled(Grid)`
  align-items: center;
  background-color: #f3f5f6;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
  padding: 10px 20px;
  height: 49px;
`;

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
