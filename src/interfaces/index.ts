export interface LectInterface {
  start?: number,
  end?: number,
  text: string,
  translation?: string,
  explanation?: string,
}

export interface SentenceInterface {
  lects: LectInterface[],
  sentenceTranslation?: string,
}

export interface HeaderInterface {
  imagePath?: string,
}

export interface ParagraphInterface {
  header?: HeaderInterface,
  sentences: SentenceInterface[],
}

export interface StoryDataInterface {
  audioPath: string,
  title?: string,
  subtitle?: string,
  paragraphs: ParagraphInterface[],
}

export interface ConfigurationInterface {
  shouldShowTranslation?: boolean,
  isTranslationBelow?: boolean,
  isBySentence?: boolean,
}