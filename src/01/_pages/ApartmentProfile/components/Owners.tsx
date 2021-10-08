import { HomeownerListResponse } from 'myApi';
import React from 'react';
import Owner from './Owner';

type Props = {
  homeowners: HomeownerListResponse[];
};

const Owners: React.FC<Props> = (props) => {
  const { homeowners } = props;
  const homeownersElems = homeowners.map((homeowner) => {
    const { fullName, personalAccountNumber, phoneNumber, id } = homeowner;
    console.log(id);

    return (
      <Owner
        id={id}
        key={personalAccountNumber}
        firstName={fullName?.replace(' unknown', '')}
        personalAccountNumber={personalAccountNumber}
        phoneNumber={phoneNumber}
      />
    );
  });
  return <div>{homeownersElems}</div>;
};

export default Owners;
27;
