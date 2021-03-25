import React, { useContext } from 'react';
import { Steps } from 'antd';
import styled from 'styled-components';
import { AddNodeContext } from '../../_pages';

const { Step } = Steps;

export const Stages = (props) => {
  const { currentTabKey, stepsArr } = useContext(AddNodeContext);

  const statuses = ['wait', 'process', 'finish', 'error'];
  const stepsList = stepsArr.map((step, index) => {
    const { title, description, status } = step;
    return <Step title={title} status={status} description="" key={title} />;
  });

  return (
    <StepsBlock>
      <Title>Этапы создания</Title>
      <Steps direction="vertical" size="small" current={currentTabKey - 1}>
        {stepsList}
      </Steps>
    </StepsBlock>
  );
};

export default Stages;

const StepsBlock = styled.div`
  padding: 8px;
`;
const Title = styled.h2`
  padding: 0;
  margin: 0;
  padding-bottom: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
`;
