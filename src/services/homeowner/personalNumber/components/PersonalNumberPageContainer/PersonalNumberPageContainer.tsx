import React, { FC, useMemo } from 'react';
import {
  Address,
  FlexContainer,
  Title,
  Wrapper,
} from './PersonalNumberPageContainer.styled';
import { PersonalNumberPageContainerProps } from './PersonalNumberPageContainer.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Button } from 'ui-kit/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

export const PersonalNumberPageContainer: FC<
  PersonalNumberPageContainerProps
> = ({
  children,
  apartment,
  titleText,
  isLoading,
  formId,
  onCancelHandler,
  isLastStage,
  isFirstStage,
  handleCheckApartmentExist,
  isCheckApartLoading,
}) => {
  const history = useNavigate();

  const address = apartment && getApartmentAddressString(apartment);

  const getFirstButton = useMemo(() => {
    if (isFirstStage || isFirstStage === undefined) {
      return (
        <Button type="ghost" onClick={() => history(-1)}>
          Отмена
        </Button>
      );
    } else {
      return (
        <Button type="ghost" onClick={onCancelHandler}>
          Назад
        </Button>
      );
    }
  }, [isFirstStage, history, onCancelHandler]);

  const getSecondButton = useMemo(() => {
    if (isLastStage || isLastStage === undefined) {
      return (
        <Button
          htmlType="submit"
          htmlForm={formId}
          onClick={() =>
            handleCheckApartmentExist && handleCheckApartmentExist()
          }
          isLoading={isCheckApartLoading}
        >
          Сохранить изменения
        </Button>
      );
    } else {
      return (
        <Button htmlType="submit" htmlForm={formId} isLoading={isLoading}>
          Далее
        </Button>
      );
    }
  }, [
    isLastStage,
    formId,
    isLoading,
    isCheckApartLoading,
    handleCheckApartmentExist,
  ]);

  return (
    <Wrapper>
      <GoBack />
      <Title>{titleText}</Title>
      <Address>
        <Link to={`/apartments/${apartment?.id}`}>{address}</Link>
      </Address>

      {children}

      <FlexContainer>
        {getFirstButton}
        {getSecondButton}
      </FlexContainer>
    </Wrapper>
  );
};
