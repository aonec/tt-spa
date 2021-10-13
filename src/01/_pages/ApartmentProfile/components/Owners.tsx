import { HomeownerAccountListResponse } from 'myApi';
import React from 'react';
import Owner from './Owner';

type Props = {
  homeowners: HomeownerAccountListResponse[];
};

const Owners: React.FC<Props> = (props) => {
  const { homeowners } = props;
  const homeownersElems = homeowners.map((homeowner) => {
    const { name, personalAccountNumber, phoneNumber, id } = homeowner;

    return (
      <Owner
        id={id}
        key={personalAccountNumber}
        firstName={name?.replace(' unknown', '')}
        personalAccountNumber={personalAccountNumber}
        phoneNumber={phoneNumber}
      />
    );
  });
  return <div>{homeownersElems}</div>;
};

export default Owners;
27;
