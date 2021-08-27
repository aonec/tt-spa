import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrap = styled.div`
  margin-bottom: 10px;
  display: grid;
  grid-template-rows: 48px 16px;
  grid-gap: 8px;
  align-items: center;
`;

export const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const Subtitle = styled(Link)<{ fontWeight?: number }>`
  color: #272f5a;
  font-weight: ${(props) => props.fontWeight};
  padding: 0;
  margin: 0;
  opacity: 0.9;
`;

Subtitle.defaultProps = {
  fontWeight: 500,
};
