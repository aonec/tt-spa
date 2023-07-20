import _ from 'lodash';
import { CommunicationPipeResponse } from 'api/myApi';

export const filterCommunicationPipes = ({
  newPipe,
  oldPipes,
}: {
  newPipe: CommunicationPipeResponse;
  oldPipes: CommunicationPipeResponse[];
}) => {
  const oldPipe = oldPipes.find((oldPipe) => oldPipe.id === newPipe.id);

  if (!oldPipe) {
    return false;
  }

  const isNoDifference = _.isEqual(oldPipe, newPipe);

  return !isNoDifference;
};
