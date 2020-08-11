export const SPACELESS_PUNCTUATION = ['.', ',', '!', '?', ':', ';'];

export const getFrontSpacer = (char: string, isFirst: boolean = false): string => (isFirst || SPACELESS_PUNCTUATION.includes(char) ? '' : ' ');
