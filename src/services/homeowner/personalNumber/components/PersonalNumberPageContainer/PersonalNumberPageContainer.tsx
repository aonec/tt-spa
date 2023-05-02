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
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

export const PersonalNumberPageContainer: FC<
  PersonalNumberPageContainerProps
> = ({
  children,
  type,
  apartment,
  titleText,
  isLoading,
  cancelButtonText,
  saveButtonText,
  formId,
  homeowner,
}) => {
  const history = useHistory();

  const address = apartment && getApartmentAddressString(apartment);

  const isSplit = type === PersonalNumberActions.Split;

  return (
    <Wrapper>
      <GoBack />
      <Title>{titleText}</Title>
      <Address>
        <Link to={`/apartments/${apartment?.id}`}>{address}</Link>
      </Address>

      {children}

      <FlexContainer>
        <Button type="ghost" onClick={history.goBack}>
          {cancelButtonText || 'Отмена'}
        </Button>
        <Button htmlType="submit" htmlForm={formId} isLoading={isLoading}>
          {isSplit ? saveButtonText || 'Далее' : 'Сохранить изменения'}
        </Button>
      </FlexContainer>
    </Wrapper>
  );
};
