import { ApartmentTaskStatus } from './ApartmentStatusLegend.types';
import styled from 'styled-components';
import { ApartmentTaskStatusColosLookup } from './ApartmentStatusLegend.constants';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const StatusCircle = styled.div<{ status: ApartmentTaskStatus }>`
  min-width: 5.5px;
  height: 5.5px;
  border-radius: 6px;
  transform: translateY(1px) scale(1.1);
  background: ${({ status }) => ApartmentTaskStatusColosLookup[status]};
`;

export const Text = styled.div`
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
