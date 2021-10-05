import { HomeownerListResponse } from 'myApi';
import React from 'react';
import Owner from './Owner';

type Props = {
  homeowners: HomeownerListResponse[];
};

const Owners: React.FC<Props> = (props) => {
  const { homeowners } = props;
  const homeownersElems = homeowners.map((homeowner) => {
    const { fullName, personalAccountNumber, phoneNumber } = homeowner;
    return (
      <Owner
        key={personalAccountNumber}
        firstName={fullName + "dfsfsdfdf"}
        personalAccountNumber={personalAccountNumber}
        phoneNumber={phoneNumber}
      />
    );
  });
  return <div>{homeownersElems}</div>;
};

export default Owners;
