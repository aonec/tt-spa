import stringSimilarity from 'string-similarity';

export function useAutocomplete(street, streets, optionsNumber = 1) {
  if (street?.toUpperCase() === 'ЛЕ') {
    street = 'лес';
  }

  const matches =
    typeof street === 'string' && Array.isArray(streets)
      ? stringSimilarity.findBestMatch(
          street,
          typeof streets[0] === 'string' ? streets : ['']
        )
      : null;

  const matchesRating = matches?.ratings || [];

  const matchesArrayFilteredByWords = matchesRating.filter((value) => {
    const formatedSearchString = street.toUpperCase();
    const formatedStreetString = value.target.toUpperCase();

    const wordsInStreetName = formatedStreetString.split(' ');

    return wordsInStreetName.some((elem) =>
      elem.startsWith(formatedSearchString)
    );
  });

  const matchesArrayFilteredByFullString = matchesRating.filter((value) => {
    const formatedSearchString = street.toUpperCase();
    const formatedStreetString = value.target.toUpperCase();

    const isRequestStringSimilarToStreet = formatedStreetString.includes(
      formatedSearchString
    );

    return isRequestStringSimilarToStreet;
  });
  const matchesArray = matchesArrayFilteredByWords.length
    ? matchesArrayFilteredByWords
    : matchesArrayFilteredByFullString;

  const preparedMatchesArray = matchesArray
    .sort((a, b) => b.rating - a.rating)
    .map(({ target }) => ({ value: target }));
  const match = preparedMatchesArray[0]?.value;

  const options =
    preparedMatchesArray?.length && street
      ? preparedMatchesArray.slice(0, optionsNumber)
      : [];

  return {
    match,
    options,
    bestMatch: options[0]?.value,
  };
}
