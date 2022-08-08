import { EResourceType } from 'myApi';
import styled from 'styled-components';

const getInputBorderColor = ({ resource }: { resource?: EResourceType }) =>
  resource ? ResourceColorLookup[resource] : '#3c436a';

const ResourceColorLookup = {
  [EResourceType.Electricity]: '#E2B104',
  [EResourceType.ColdWaterSupply]: '#79AFFF',
  [EResourceType.HotWaterSupply]: '#FF8C68',
  [EResourceType.Heat]: null,
};

export const Wrapper = styled.div<{ resource?: EResourceType }>`
  transition: 0.2s;

  border: 1px solid ${getInputBorderColor};
  border-left-width: 5px;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 25, 0.1);
  }

  &:focus-within {
    box-shadow: 0 5px 10px rgba(0, 0, 25, 0.2);
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #00002222;

  &:last-child {
    border-bottom: none;
  }
`;

export const Input = styled.input`
  transition: 0.2s;
  padding: 5px 10px;
`;

export const ReadingDate = styled.div`
  line-height: 0;
  margin: 10px 0 5px;
  text-align: right;
  color: rgba(39, 47, 90, 0.5);
`;

export const SourceIconWrapper = styled.div`
  cursor: pointer;
  margin: 2px 10px 0 5px;
`;
