export const SPACELESS_PUNCTUATION = ['.', ',', '!', '?', ':', ';'];
export const getFrontSpacer = (char, isFirst) => (isFirst || SPACELESS_PUNCTUATION.includes(char) ? '' : ' ');