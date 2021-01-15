import React from 'react';
import Owner from "./Owner";

type HomeOwnerType = {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  personalAccountNumber: string | null
  phoneNumber: string | null
}

type Props = {
  homeowners: HomeOwnerType[]
}

const Owners: React.FC<Props> = (props) => {
  debugger;
  const { homeowners } = props;
  const homeownersElems = homeowners.map((homeowner) => {
    const { firstName, personalAccountNumber, phoneNumber } = homeowner;
    return (
      <Owner key={personalAccountNumber}
             firstName={firstName}
             personalAccountNumber={personalAccountNumber}
             phoneNumber={phoneNumber} />
    )
  })
  return (
    <div>{homeownersElems}</div>
  )
}

export default Owners;