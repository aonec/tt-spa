import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 300px;
`;

export const horizontalAxisStyle = {
  axis: { stroke: 'var(--frame)' },
  axisLabel: { strokeWidth: 0 },
  grid: { stroke: 'none' },
  tickLabels: { fill: 'var(--main-70)' },
};

export const verticalAxisStyle = {
  parent: { width: '100%' },
  axis: { stroke: 'none' },
  ticks: { stroke: 'none' },
  tickLabels: { fill: 'var(--main-70)' },
  grid: { stroke: 'var(--frame)', strokeDasharray: '0' },
};
