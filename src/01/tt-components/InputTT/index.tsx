import styled from 'styled-components';
import { Input } from 'antd';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { InputProps } from 'antd/lib/input';
import { Event } from 'effector';

interface Props {
  value?: any;
  disabled?: boolean;
  readonly?: boolean;
  onChange?:
    | Dispatch<SetStateAction<string>>
    | Event<React.ChangeEvent<HTMLInputElement>>
    | ChangeEventHandler<HTMLInputElement>;
  // value: string | number | null
}

export const InputTT = styled(Input)<Partial<Props & InputProps>>`
  color: rgba(39, 47, 90, 0.8);
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: ${(props) => props.height || '48px'};
  padding: 8px 24px;
  font-size: 16px;
  line-height: 32px;
`;

export default InputTT;
