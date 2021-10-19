import React from 'react';
import Owner from './Owner';

const Owners = (props) => {
  const { homeownerAccounts } = props;
  const res = homeownerAccounts?.map((homeowner, index) => {
    const { personalAccountNumber, phoneNumber, name, id } = homeowner;
    return (
      <Owner
        id={id}
        key={personalAccountNumber}
        name={name}
        personalAccountNumber={personalAccountNumber}
        phoneNumber={phoneNumber}
      />
    );
  });
  return <div>{res}</div>;
};
export default Owners;
