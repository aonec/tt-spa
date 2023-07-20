import {
  ApartmentListResponse,
  ApartmentListResponsePagedList,
} from 'api/types';
import { FC } from 'react';

export type SegmentType = 'list' | 'cells';

export type ApartmentsViewProps = {
  apartmentsPagedList?: ApartmentListResponsePagedList | null;
  isLoading: boolean;
  hosuingStockId: number;
  currentSegment: SegmentType;
  setCurrentSegment: (segment: SegmentType) => void;
  setCurrentApartmentId: (id: number) => void;
  currentApartmentId: number | null;
  clearCurrentApartmentId: () => void;
};

export type ListComponentProps = {
  apartments: ApartmentListResponse[];
  hosuingStockId: number;
  setCurrentApartmentId: (id: number) => void;
  currentApartmentId: number | null;
  clearCurrentApartmentId: () => void;
};

export type ListComponents = { [key in SegmentType]: FC<ListComponentProps> };
