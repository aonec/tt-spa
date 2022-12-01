import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { Footer } from '../CreateNodePage.styled';
import { Wrapper } from './CommonData.styled';
import { CommonDataProps } from './CommonData.types';

export const CommonData: FC<CommonDataProps> = ({ goPrevStep }) => {
  return (
    <Wrapper>
      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20} onClick={() => {}}>
          Далее
        </Button>
      </Footer>
    </Wrapper>
  );
};
