import { EActResourceType, EResourceType, ResourceType } from 'api/types';
import { CSSProperties } from 'react';

export type ResourceInfoProps = {
  resource: EActResourceType | EResourceType | ResourceType;
  style?: CSSProperties;
};
