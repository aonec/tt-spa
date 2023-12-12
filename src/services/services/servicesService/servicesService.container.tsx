import React, { FC } from 'react';
import { ServiceSection } from './servicesService.types';
import { useParams } from 'react-router';
import { SealContainer } from '../sealService';

export const ServicesContainer = () => {
  const { service } = useParams<{ service: ServiceSection }>();
  if (!service) return null;

  const componentsDictionary: { [key in ServiceSection]: FC } = {
    [ServiceSection.Seal]: SealContainer,
  };

  const Component = componentsDictionary[service];

  return <Component />;
};
