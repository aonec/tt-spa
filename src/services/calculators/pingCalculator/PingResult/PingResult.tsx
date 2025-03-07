import { FC } from 'react';
import { Wrapper } from './PingResult.styled';
import { Props } from './PingResult.types';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';

export const PingResult: FC<Props> = ({ pingResult, calculator }) => {
  return (
    <Wrapper>
      <FormItem label="IP адрес">
        <Input disabled value={calculator.connection?.ipV4 || '—'} />
      </FormItem>
      <FormItem label="Статус">
        <Input
          disabled
          value={`${pingResult.status} (${pingResult.description})`}
        />
      </FormItem>
    </Wrapper>
  );
};
