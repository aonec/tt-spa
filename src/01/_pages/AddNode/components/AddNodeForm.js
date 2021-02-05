import React, {useContext, useEffect, useRef, useState} from 'react';
import {Form} from 'antd';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
    resources, magistrals, housingMeteringDeviceTypes, isConnected, ipv4RegExp, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
    Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning, StyledModalHeader,
} from '../../../tt-components';
import TabsComponent from './Tabs';
import RelatedDevices from './RelatedDevices';
import {styles, StyledFormPage} from './styledComponents';
import {addNode} from '../apiAddNode';

import AddNodeFirstTab from './AddNodeFirstTab'
import {AddNodeContext} from "../index";
import AddNodeSecondTab from "./AddNodeSecondTab";

const StyledHint = styled.div`
  color: rgba(39, 47, 90, 0.7)
`;

const AddNodeForm = (props) => {

    const {handleCancel, currentTabKey, setTab, handleChangeTab, handleNext} = useContext(AddNodeContext)
    const {
        housingStock,
        addCalculator,
        setAddCalculator,
        calculators,
        currentCalculatorId,
        setCurrentCalculatorId,
        setAddOdpu,
        addOdpu,
        devices,
        setDevices,
        calculatorsExtended,
        setResource,
        entryNumber,
        setEntryNumber,
        communicationPipes,
    } = props;
    const [disable, setDisable] = useState(false);
    const [validationSchema, setValidationSchema] = useState(Yup.object({}));

    const {
        handleSubmit, handleChange, values, touched, errors,
        handleBlur, setFieldValue, setValues,
    } = useFormik({
        initialValues: {
            resource: resources[0].value,
            number: 1,
            serviceZone: serviceZoneList[0].value,
            nodeStatus: nodeStatusList[0].value,
            lastCheckingDate: moment().toISOString(),
            futureCheckingDate: moment().add(1, 'years').toISOString(),
            isConnected: true,
            calculatorId: null,
            devices,
        },
        validationSchema,

        onSubmit: async () => {

            const form = {
                resource: values.resource,
                number: values.number,
                serviceZone: values.serviceZone,
                nodeStatus: values.nodeStatus,
                lastCommercialAccountingDate: values.lastCommercialAccountingDate,
                futureCommercialAccountingDate: values.futureCommercialAccountingDate,
                calculatorId: values.calculatorId,
                communicationPipes,
            };
            console.log(form);
            console.log(JSON.stringify(form));
            // addNode(form).then((res) => {
            //   console.log(res);
            // });
        },
    });

    useEffect(() => {
        setFieldValue('calculatorId', currentCalculatorId);
    }, [currentCalculatorId]);

    useEffect(() => {
        setFieldValue('devices', devices);
    }, [devices]);

    const Alert = ({name}) => {
        const touch = _.get(touched, `${name}`);
        const error = _.get(errors, `${name}`);
        if (touch && error) {
            return (
                <div>{error}</div>
            );
        }
        return null;
    };


    const entryNumberList = [
        {value: 1, label: 1},
        {value: 2, label: 2},
    ];

    const handleModalAddCalculator = () => {
        setAddCalculator(true);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{display: 'flex', flexDirection: 'column'}}
        >
            <TabsComponent
                currentTabKey={currentTabKey}
                handleChangeTab={handleChangeTab}
            />

            {/* First Tab */}
            <AddNodeFirstTab/>
            {/* Second Tab */}
            <AddNodeSecondTab />

            <StyledFormPage hidden={Number(currentTabKey) !== 3}>
                <Title color="black" style={styles.w100}>
                    Настройки соединения
                </Title>
                <div style={styles.w100}>
                    <RelatedDevices {...props} />
                </div>
                <ButtonTT
                    style={{marginTop: '24px'}}
                    color="white"
                    type="button"
                    onClick={() => {
                        setAddOdpu(true);
                    }}
                >
                    + Добавить прибор
                </ButtonTT>
            </StyledFormPage>

            {/*<StyledFooter form>*/}

            {/*  <ButtonTT*/}
            {/*    color="blue"*/}
            {/*    onClick={handleNext}*/}
            {/*    big*/}
            {/*    hidden={currentTabKey === '3'}*/}
            {/*    type="button"*/}
            {/*  >*/}
            {/*    Далее*/}
            {/*  </ButtonTT>*/}

            {/*  <ButtonTT*/}
            {/*    color="blue"*/}
            {/*    type="submit"*/}
            {/*    hidden={currentTabKey !== '3'}*/}
            {/*    big*/}
            {/*  >*/}
            {/*    Создать узел*/}
            {/*  </ButtonTT>*/}
            {/*   <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}> */}
            {/*    Отмена */}
            {/*   </ButtonTT> */}
            {/*</StyledFooter>*/}
        </form>
    );
};
export default AddNodeForm;

// console.log('calculatorsExtended', calculatorsExtended);
// const currentCalculator = _.find(calculatorsExtended, { id: currentCalculatorId });
// console.log('currentCalculator', currentCalculator);
//
// const entryNumberListDraft = currentCalculator ? currentCalculator.nodes.map((node, index) => {
//   const { communicationPipes } = node;
//   const communicationPipesArr = communicationPipes.map((communicationPipe, index) => {
//     const { entryNumber } = communicationPipe;
//     console.log('entryNumber', entryNumber);
//     return {value: entryNumber, label: entryNumber}
//   });
//   return communicationPipesArr
// }) : [];
//
// const entryNumberList =_.uniqBy(_.flatten(entryNumberListDraft), function (e) {
//   return e.value;
// }).sort()
