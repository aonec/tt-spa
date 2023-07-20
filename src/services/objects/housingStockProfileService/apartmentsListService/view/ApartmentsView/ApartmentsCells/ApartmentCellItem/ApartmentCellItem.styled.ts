import { ETasksState } from 'api/types';
import { ChevronRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TasksStateBackgroundLookup } from '../ApartmentStatusLegend/ApartmentStatusLegend.constants';
import { TasksStateColorsLookup } from './ApartmentCellItem.constants';

export const CellWrapper = styled(Link)<{ tasksState: ETasksState }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background: ${({ tasksState }) => TasksStateBackgroundLookup[tasksState]};
  border: 1px solid #f3f5f6;
  box-shadow: 0 5px 10px rgba(0, 10, 60, 0.14);
  font-weight: 500;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ tasksState }) => TasksStateColorsLookup[tasksState]};

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 5px 10px rgba(0, 10, 60, 0.2);
    color: white;
    background: #272f5a;
  }
`;

export const PopoverTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const HomeownerName = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #272f5a;
`;

export const AdditionalInfoTextWrapper = styled.div`
  margin-top: 5px;
  font-weight: 400;
  font-size: 12px;
  color: rgba(39, 47, 90, 0.7);
`;

export const BottomContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PopoverLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const PopoverLinkChevron = styled(ChevronRight)`
  margin-left: 5px;
`;
