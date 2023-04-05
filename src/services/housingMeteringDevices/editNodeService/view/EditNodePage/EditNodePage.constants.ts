import { ENodeRegistrationType } from 'myApi';

export const NodeRegistrationTypeLookup: {
  [key in ENodeRegistrationType]: string;
} = {
  [ENodeRegistrationType.Commercial]: 'Коммерческий узел',
  [ENodeRegistrationType.Technical]: 'Технический узел',
};
