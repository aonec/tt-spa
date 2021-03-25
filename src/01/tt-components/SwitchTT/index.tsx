import React from 'react';
import styled from "styled-components";
import {Switch} from "antd";

interface SwitchTTInterface {
    name? : string
}

export const SwitchTT = styled(Switch)<SwitchTTInterface>`
  
`

export default SwitchTT;
