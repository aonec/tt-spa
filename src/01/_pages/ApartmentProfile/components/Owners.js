import React from 'react';
import Owner from './Owner';

const Owners = (props) => {
  const { homeowners } = props;
  const res = homeowners.map((homeowner, index) => {
    const {
      personalAccountNumber,
      phoneNumber,
      fullName,
      id,
    } = homeowner;
    return (
      <Owner
        id={id}
        key={personalAccountNumber}
        firstName={fullName}
        personalAccountNumber={personalAccountNumber}
        phoneNumber={phoneNumber}
      />
    );
  });
  return <div>{res}</div>;
};
export default Owners;
