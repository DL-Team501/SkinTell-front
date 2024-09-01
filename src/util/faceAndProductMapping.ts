export const goodMatchFaceTypeToProductTypeMapping: Record<string, string[]> = {
  acne: ['acne', 'blemishes'],
  oil: ['oily', 'combination'],
  'dark circle': ['dark', 'puffiness'],
  wrinkle: ['wrinkles'],
  dry: ['dry', 'sensitive', 'combination'],
};

export const badMatchFaceTypeToProductTypeMapping: Record<string, string[]> = {
  // Conflicts between oil and dry conditions
  oil: ['dry', 'sensitive'],
  dry: ['oily', 'combination'],

  // Conflicts between wrinkle concerns and other conditions
  wrinkle: ['oily'],

  // Conflicts between dark circle concerns and unrelated conditions
  'dark circle': ['normal', 'uneven'],

  // Conflicts between acne concerns and unrelated conditions
  acne: ['dullness', 'pores'],
};
