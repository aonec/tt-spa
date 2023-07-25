export type DiamtersConfig = {
  marks: {
    [key: string]: string;
  };
  maxValue: number;
  minValue: number;
  diameters: number[];
};

export type OrganizationCoordinates = [number, number];
