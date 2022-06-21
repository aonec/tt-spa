import { EActResourceType, EResourceType } from 'myApi';
import { CSSProperties } from 'react';

export type ResourceIconLookupProps = {
  resource: EResourceType | EActResourceType;
  style?: CSSProperties;
};

export type Icons = {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};
