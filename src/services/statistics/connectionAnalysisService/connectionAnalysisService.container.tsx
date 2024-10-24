import React from 'react';
import { connectionAnalysisService } from './connectionAnalysisService.models';
import { Statistics } from './Statistics';

const { inputs, outputs } = connectionAnalysisService;

export const ConnectionAnalysisContainer = () => {
  return (
    <>
      <Statistics />
    </>
  );
};
