import { MagistralsDisctionary } from 'dictionaries';
import React, { FC } from 'react';
import { PipeIcon } from 'ui-kit/icons';
import {
  GroupWrapper,
  InputWrapper,
  LabelSC,
  NameWrapper,
  Wrapper,
} from './ConfiguratePipe.styled';
import { ConfiguratePipeProps } from './ConfiguratePipe.types';
import { Input } from 'ui-kit/Input';

export const ConfiguratePipe: FC<ConfiguratePipeProps> = ({
  handleChangeDiameter,
  handleChangeNumber,
  pipe,
  index,
}) => {
  return (
    <Wrapper>
      <NameWrapper>
        <PipeIcon />
        Труба {index}
      </NameWrapper>
      <GroupWrapper>
        <InputWrapper>
          <LabelSC>Магистраль</LabelSC>
          <Input
            search
            value={
              pipe.magistral ? MagistralsDisctionary[pipe.magistral] : undefined
            }
            disabled
          />
        </InputWrapper>
        <InputWrapper>
          <LabelSC>Номер</LabelSC>
          <Input
            search
            value={pipe.number || undefined}
            onChange={(e) => handleChangeNumber(Number(e.target.value))}
            placeholder={'0'}
            type="number"
          />
        </InputWrapper>
        <InputWrapper>
          <LabelSC>Диаметр</LabelSC>
          <Input
            search
            value={pipe.diameter || undefined}
            onChange={(e) => handleChangeDiameter(Number(e.target.value))}
            type="number"
            placeholder={'0'}
          />
        </InputWrapper>
      </GroupWrapper>
    </Wrapper>
  );
};
