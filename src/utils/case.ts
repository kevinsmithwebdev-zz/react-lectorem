export const convertToTrainCase = (str: string) => str
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
