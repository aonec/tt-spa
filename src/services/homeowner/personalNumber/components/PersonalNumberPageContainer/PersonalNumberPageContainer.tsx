import React, { FC, useMemo } from 'react';
import {
  Address,
  FlexContainer,
  Title,
  Wrapper,
} from './PersonalNumberPageContainer.styled';
import { PersonalNumberPageContainerProps } from './PersonalNumberPageContainer.types';
import { GoBack } from 'ui-kit/sharedComponents/GoBack';
import { Button } from 'ui-kit/Button';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const address = apartment && getApartmentAddressString(apartment);

  const getFirstButton = useMemo(() => {
    if (isFirstStage || isFirstStage === undefined) {
      return (
        <Button type="ghost" onClick={history.goBack}>
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
  }, [isFirstStage, history.goBack, onCancelHandler]);

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
