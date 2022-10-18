import { ApartmentListResponse, ApartmentListResponsePagedList } from 'myApi';
import { FC } from 'react';

export type ApartmentsViewProps = {
  apartmentsPagedList?: ApartmentListResponsePagedList | null;
  isLoading: boolean;
};

export type SegmentType = 'list' | 'cells';

export type ListComponentProps = {
  apartments: ApartmentListResponse[]
};

export type ListComponents = { [key in SegmentType]: FC<ListComponentProps> };
