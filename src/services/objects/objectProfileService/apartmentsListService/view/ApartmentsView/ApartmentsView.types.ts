import { ApartmentListResponse, ApartmentListResponsePagedList } from 'myApi';
import { FC } from 'react';

export type SegmentType = 'list' | 'cells';

export type ApartmentsViewProps = {
  apartmentsPagedList?: ApartmentListResponsePagedList | null;
  isLoading: boolean;
  hosuingStockId: number;
  currentSegment: SegmentType;
  setCurrentSegment: (segment: SegmentType) => void;
  setCurrentApartmentId: (id: number) => void;
};

export type ListComponentProps = {
  apartments: ApartmentListResponse[];
  hosuingStockId: number;
  setCurrentApartmentId: (id: number) => void;
};

export type ListComponents = { [key in SegmentType]: FC<ListComponentProps> };
