export const toTitleCase = (string: string) => {
  const array = string.split('');
  array[0] = array[0].toUpperCase();
  return array.join('');
};
