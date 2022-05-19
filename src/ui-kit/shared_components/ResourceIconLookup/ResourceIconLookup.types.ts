import { CSSProperties, FC } from 'react';

export type ResourceIconLookupProps = {
  icon: string;
  style?: CSSProperties;
};

export type Icons = {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};
