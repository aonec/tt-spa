import { countSimilarityPoints } from 'utils/countSimilarityPoints';
import { UserWithEmail } from './RegularUnloading.types';

export function autocompleteUsersWithEmail(
  search: string | null,
  users: UserWithEmail[],
) {
  if (!search) {
    return users;
  }

  return sorUserBySimilarity(search, users);
}

function sorUserBySimilarity(search: string, users: UserWithEmail[]) {
  return users.sort((aUser, bUser) => {
    const aReasonWithResource = `${aUser.email} ${aUser.name}`;
    const bReasonWithResource = `${bUser.email} ${bUser.name}`;

    const aReasonPoints = countSimilarityPoints(search, aReasonWithResource);
    const bReasonPoints = countSimilarityPoints(search, bReasonWithResource);

    return bReasonPoints - aReasonPoints;
  });
}
