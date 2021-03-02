import styled from 'styled-components';
import { Input } from 'antd';

interface Props {
    value: any

    // value: string | number | null
}

export const InputTT = styled(Input)<Props>`
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
