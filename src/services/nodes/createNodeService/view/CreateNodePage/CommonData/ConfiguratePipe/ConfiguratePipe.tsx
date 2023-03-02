import { InputSC } from '01/shared/ui/Fields';
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
          <InputSC
            value={
              pipe.magistral ? MagistralsDisctionary[pipe.magistral] : undefined
            }
            disabled
            isShadow={false}
          />
        </InputWrapper>
        <InputWrapper>
          <LabelSC>Номер</LabelSC>
          <InputSC
            value={pipe.number || undefined}
            onChange={(e) => handleChangeNumber(Number(e.target.value))}
            placeholder={'0'}
            isShadow={false}
            type="number"
          />
        </InputWrapper>
        <InputWrapper>
          <LabelSC>Диаметр</LabelSC>
          <InputSC
            value={pipe.diameter || undefined}
            onChange={(e) => handleChangeDiameter(Number(e.target.value))}
            type="number"
            placeholder={'0'}
            isShadow={false}
          />
        </InputWrapper>
      </GroupWrapper>
    </Wrapper>
  );
};
