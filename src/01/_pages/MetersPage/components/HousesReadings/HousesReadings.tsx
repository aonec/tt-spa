import React, {useEffect, useState} from "react"
import HousesDevices from "./HousesDevices/HousesDevices";
import HousesSearchForm from "./HousesSearchForm/HousesSearchForm";

const HouseReadings = () => {



    return (
        <div>
            <HousesSearchForm />
            <HousesDevices />
        </div>
    )
}

export default HouseReadings;