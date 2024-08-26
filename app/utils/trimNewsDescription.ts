import tokenizer from 'sbd';

const MAX_DESCRIPTION_LENGTH = 300;

const TOKENIZER_OPTIONS = {
  newline_boundaries: true,
};

const trimNewsDescription = (description: string) => {
  const sentences = tokenizer.sentences(description, TOKENIZER_OPTIONS);
  let trimmedDescription = '';

  for (const sentence of sentences) {
    if (trimmedDescription.length + sentence.length > MAX_DESCRIPTION_LENGTH) return trimmedDescription;
    trimmedDescription += sentence;
  }

  return trimmedDescription;
};

export default trimNewsDescription;
