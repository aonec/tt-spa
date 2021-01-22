import React from 'react';
import Owner from './Owner';

const Owners = (props) => {
  console.log('homeowners', props);
  const { homeowners } = props;
  console.log('homeowners', homeowners);
  const res = homeowners.map((homeowner, index) => {
    const { firstName, personalAccountNumber, phoneNumber } = homeowner;
    return (
      <Owner
        key={personalAccountNumber}
        firstName={firstName}
        personalAccountNumber={personalAccountNumber}
        phoneNumber={phoneNumber}
      />
    );
  });
  return (
    <div>
      {res}
    </div>
  );
};
export default Owners;
