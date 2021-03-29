import fs from 'fs';
import path from 'path';
import { applicationMergerConfig } from './applicationMergerConfig';

export const applyFileContent = (
  outputFilename: string,
  newContent: {
    content: string;
    mode: number;
  }
): 'deleted' | 'merged' | 'replaced' | 'created' | 'skipped' => {
  if (fs.existsSync(outputFilename)) {
    if (!newContent) {
      fs.rmSync(outputFilename);

      return 'deleted';
    }

    const mergeFn = applicationMergerConfig.first(({ filenamePattern }) =>
      filenamePattern.test(outputFilename)
    );

    const oldContent = fs.readFileSync(outputFilename, 'utf-8');

    const combinedContent = mergeFn
      ? mergeFn.mergeFn([oldContent, newContent.content])
      : newContent.content;

    fs.writeFileSync(outputFilename, combinedContent);

    const { mode } = fs.statSync(outputFilename);
    if (mode !== newContent.mode) {
      fs.chmodSync(outputFilename, newContent.mode);
    }

    return mergeFn ? 'merged' : 'replaced';
  }

  if (!newContent) {
    return 'skipped';
  }

  fs.mkdirSync(path.dirname(outputFilename), { recursive: true });
  fs.writeFileSync(outputFilename, newContent.content);
  fs.chmodSync(outputFilename, newContent.mode);

  return 'created';
};
