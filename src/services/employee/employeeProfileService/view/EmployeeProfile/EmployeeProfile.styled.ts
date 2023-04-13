import { PageHeader } from '01/shared/ui/PageHeader';
import styled from 'styled-components';
import { Tabs } from 'ui-kit/Tabs';

export const Wrapper = styled.div``;

export const BlockTitle = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: #272f5a;
  margin-bottom: 24px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
`;

export const FieldTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(39, 47, 90, 0.7);
`;

export const FieldName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: rgba(39, 47, 90, 0.9);
`;

export const Field = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(39, 47, 90, 0.9);
`;

export const FieldHousingStocksNumber = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(39, 47, 90, 0.9);
  text-decoration: underline;
  cursor: pointer;
`;

export const СompetenceDiv = styled.div`
  width: max-content;
  padding: 6px 8px 6px 12px;
  gap: 4px;
  background: #272f5a;
  border: 1px solid #272f5a;
  border-radius: 2px;
  color: #ffffff;
  margin: 10px 8px 0px 0px;
`;

export const CompetenciesContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
`;
