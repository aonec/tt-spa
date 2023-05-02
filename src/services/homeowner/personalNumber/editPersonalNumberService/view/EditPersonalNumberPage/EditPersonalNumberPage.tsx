import React, { FC } from 'react';
import {
  Address,
  FlexContainer,
  Title,
  Wrapper,
} from './EditPersonalNumberPage.styled';
import { EditPersonalNumberPageProps } from './EditPersonalNumberPage.types';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { Link, useHistory } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { getApartmentAddressString } from 'utils/getApartmentAddress';

const formId = 'edit-personal-number-page';

export const EditPersonalNumberPage: FC<EditPersonalNumberPageProps> = ({
  handleEditHomeownerAccount,
  isLoading,
  apartment,
}) => {
  const history = useHistory();

  const address = apartment && getApartmentAddressString(apartment);

  return (
    <Wrapper>
      <GoBack />
      <Title>Редактирование лицевого счета</Title>
      <Address>
        <Link to={`/apartments/${apartment?.id}`}>{address}</Link>
      </Address>

      <PersonalNumberForm
        type={PersonalNumberActions.Add}
        formId={formId}
        handleEditHomeownerAccount={handleEditHomeownerAccount}
      />

      <FlexContainer>
        <Button type="ghost" onClick={history.goBack}>
          Отмена
        </Button>
        <Button htmlType="submit" htmlForm={formId} isLoading={isLoading}>
          Сохранить изменения
        </Button>
      </FlexContainer>
    </Wrapper>
  );
};
