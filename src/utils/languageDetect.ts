export function languageDetect(input: string) {
  const hasRussian = /[а-яё]/i.test(input);
  const hasEnglish = /[a-z]/i.test(input);

  if (hasRussian && hasEnglish) {
    return 'ru-en';
  } else if (hasRussian) {
    return 'ru';
  } else if (hasEnglish) {
    return 'en';
  } else {
    return 'unknown';
  }
}
