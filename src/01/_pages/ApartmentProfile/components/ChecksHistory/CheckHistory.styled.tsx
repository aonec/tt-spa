import { Grid } from '01/shared/ui/Layout/Grid';
import styled from 'styled-components';

export const Wrap = styled.div`
  width: 920px;
`;

export const Header = styled(Grid)`
  background: rgba(39, 47, 90, 0.04);
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ListItem = styled(Grid)`
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;
`;

export const CreateButton = styled.div`
  cursor: pointer;
`;
