import React, { FC } from 'react';
import {
  Address,
  FlexContainer,
  Title,
  Wrapper,
} from './PersonalNumberPageContainer.styled';
import { PersonalNumberPageContainerProps } from './PersonalNumberPageContainer.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
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

  return (
    <Wrapper>
      <GoBack />
      <Title>{titleText}</Title>
      <Address>
        <Link to={`/apartments/${apartment?.id}`}>{address}</Link>
      </Address>

      {children}

      <FlexContainer>
        {isFirstStage ? (
          <Button type="ghost" onClick={history.goBack}>
            Отмена
          </Button>
        ) : (
          <Button type="ghost" onClick={onCancelHandler}>
            Назад
          </Button>
        )}
        {!isLastStage && (
          <Button htmlType="submit" htmlForm={formId} isLoading={isLoading}>
            Далее
          </Button>
        )}
        {isLastStage && (
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
        )}
      </FlexContainer>
    </Wrapper>
  );
};
