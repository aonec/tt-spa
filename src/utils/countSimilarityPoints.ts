export function countSimilarityPoints(search: string, string: string) {
  let street = string.toLowerCase();

  const searchArr = search.toLowerCase().split(' ').filter(Boolean);

  let points = 0;
  const indexOfOverlaping = street
    .split(' ')
    .findIndex((elem) => elem.indexOf(search.toLowerCase()) === 0);

  if (indexOfOverlaping !== -1) {
    points += indexOfOverlaping ? 1 : 2;
  }

  points += searchArr.reduce((points, searchSlice) => {
    if (street.includes(searchSlice)) {
      street = street.replace(searchSlice, '');
      return points + 1;
    }
    return points;
  }, 0);

  return points;
}

export function countSimilarityPointsByAddress(
  search: string,
  string: string,
): number {
  if (!search || !string) return 0;

  let address: string = string.toLowerCase();
  const searchArr: string[] = search.toLowerCase().split(' ').filter(Boolean);
  let points: number = 0;

  // Разбиваем адрес на слова
  const addressWords = address.split(' ');
  const searchWords = search.toLowerCase().split(' ');

  // Приоритет совпадения с первым словом адреса
  if (addressWords[0] === searchWords[0]) {
    points += 8; // Повышенный приоритет
  }

  // Приоритет совпадения с начала строки
  if (address.startsWith(search.toLowerCase())) {
    points += 6;
  }

  // Проверяем, начинается ли какой-либо элемент адреса с искомой строки
  const indexOfOverlapping: number = addressWords.findIndex((elem) =>
    elem.startsWith(searchWords[0]),
  );
  if (indexOfOverlapping !== -1) {
    points += indexOfOverlapping === 0 ? 4 : 2;
  }

  // Учитываем точное совпадение числа, приоритет выше, если без буквы ("1" > "1А")
  const numberMatch = address.match(/\b\d+\b/g);
  const searchNumbers = search.match(/\b\d+\b/g);
  if (numberMatch && searchNumbers) {
    searchNumbers.forEach((num) => {
      if (numberMatch.includes(num)) {
        points += 6; // Повышенный приоритет точного номера
      }
    });
  }

  // Снижаем приоритет номеров с буквами ("1А", "1Б")
  const alphaNumberMatch = address.match(/\b\d+[А-Яа-я]\b/g);
  if (alphaNumberMatch) {
    alphaNumberMatch.forEach((num) => {
      if (search.includes(num)) {
        points += 5;
      }
    });
  }

  // Учитываем частичное совпадение слов
  searchArr.forEach((searchSlice) => {
    const matchCount: number = address.split(searchSlice).length - 1;
    if (matchCount > 0) {
      points += matchCount * 2;
      address = address.replace(new RegExp(searchSlice, 'g'), '');
    }
  });

  return points;
}
