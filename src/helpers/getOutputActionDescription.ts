import fs from 'fs';

export const getOutputActionDescription = (
  newContent: string,
  outputFilename: string
): 'Generating' | 'Overwriting' | 'Skipping' => {
  if (!fs.existsSync(outputFilename)) {
    return 'Generating';
  }

  const oldContent = fs.readFileSync(outputFilename, 'utf-8');

  if (oldContent !== newContent) {
    return 'Overwriting';
  }

  return 'Skipping';
};
