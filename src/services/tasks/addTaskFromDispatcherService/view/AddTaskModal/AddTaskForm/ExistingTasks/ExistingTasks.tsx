import React, { FC, useState } from 'react';
import dayjs from 'api/dayjs';
import {
  ButtonSC,
  ChevronSC,
  ChevronWrapper,
  DateWrapper,
  GridContainerAsymmetric,
  Header,
  LeftBlock,
  PanelWrapper,
  Title,
} from './ExistingTasks.styled';
import { ExistingTasksProps } from './ExistingTasks.types';
import { CheckedBoxIcon } from 'ui-kit/icons';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';

export const ExistingTasks: FC<ExistingTasksProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <PanelWrapper>
      <Header onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <LeftBlock>
          <CheckedBoxIcon />
          <Title>Ревизия узла учета горячего и холодного водоснабжения</Title>
        </LeftBlock>
        <ChevronWrapper>
          <ChevronSC isOpen={isOpen} />
        </ChevronWrapper>
      </Header>

      {isOpen && (
        <DateWrapper>
          <FormItem label="Дата заявки">
            <GridContainerAsymmetric>
              <Input value={'20.06.2023'} disabled />
              <Input value={'11:00'} disabled />
            </GridContainerAsymmetric>
          </FormItem>
          <FormItem label="Нормативный срок">
            <GridContainerAsymmetric>
              <Input value={'21.06.2023'} disabled />
              <Input value={'11:00'} disabled />
            </GridContainerAsymmetric>
          </FormItem>
          <ButtonSC floating>Объединить</ButtonSC>
        </DateWrapper>
      )}
    </PanelWrapper>
  );
};
