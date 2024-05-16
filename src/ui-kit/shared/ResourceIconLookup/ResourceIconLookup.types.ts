import {
  EActResourceType,
  EResourceType,
  ETaskTargetObjectInfo,
} from 'api/types';
import { CSSProperties } from 'react';

export type ResourceIconLookupProps = {
  resource: EResourceType | EActResourceType | ETaskTargetObjectInfo;
  style?: CSSProperties;
};

export type Icons = {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};
