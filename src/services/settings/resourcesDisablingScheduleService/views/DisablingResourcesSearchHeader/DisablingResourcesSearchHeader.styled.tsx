import styled from 'styled-components';

export const StyledDisablingResourcesSearchHeader = styled.div`
  height: 32px;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 2.9fr 0.55fr 1fr;
  gap: 16px;
`;

export const SortLable = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
`;

export const ExtendedSearchContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.05fr;
  gap: 0 15px;
`;

export const ResourceOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
