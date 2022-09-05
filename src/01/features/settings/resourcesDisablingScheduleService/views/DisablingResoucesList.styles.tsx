import { Grid } from '01/shared/ui/Layout/Grid';
import styled from 'styled-components';

export const ApartmentWrap = styled(Grid)`
  padding: 10px 20px;
  border-bottom: 1px solid #f3f5f6;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #3241e6;
    background-color: #3948f113;
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

export const DisablingResourceWrapper = styled.div`
  max-width: 960px;
`;

export const TimeElement = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledTextElement = styled.span`
  text-overflow: ellipsis;
`;

export const StyledFontLarge = styled.span`
  font-weight: 500;
  margin-right: 5px;
`;
