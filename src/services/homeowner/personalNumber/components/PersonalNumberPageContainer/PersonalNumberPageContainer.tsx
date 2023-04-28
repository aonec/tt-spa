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
import { Link, useHistory, useParams } from 'react-router-dom';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { Loader } from 'ui-kit/Loader';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

const {
  gates: { ApartmentGate },
} = apartmentProfileService;

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
}) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const address = apartment && getApartmentAddressString(apartment);

  const isSplit = type === PersonalNumberActions.Split;

  return (
    <Wrapper>
      <ApartmentGate apartmentId={Number(id)} />
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
        <Button disabled={isLoading} onClick={() => {}}>
          {isLoading ? (
            <Loader show />
          ) : isSplit ? (
            saveButtonText || 'Далее'
          ) : (
            'Сохранить изменения'
          )}
        </Button>
      </FlexContainer>
    </Wrapper>
  );
};
