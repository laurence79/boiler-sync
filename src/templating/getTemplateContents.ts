import fs from 'fs';
import path from 'path';
import { expandHandlebars } from './expandHandlebars';
import { templateMergerConfig } from './templateMergerConfig';

export const getTemplateContents = (
  templatePaths: string[],
  relativeFilename: string,
  parameterValues: Record<string, string>
): { content: string; mode: number } => {
  const fileContents = templatePaths.compactMap(dir => {
    const filename = path.join(dir, relativeFilename);

    if (fs.existsSync(filename)) {
      const { mode } = fs.statSync(filename);
      return {
        content: fs.readFileSync(filename, 'utf-8'),
        mode
      };
    }

    const maybeHbsFile = `${filename}.hbs`;

    if (fs.existsSync(maybeHbsFile)) {
      const { mode } = fs.statSync(maybeHbsFile);
      return {
        content: expandHandlebars(maybeHbsFile, parameterValues),
        mode
      };
    }

    return undefined;
  });

  if (fileContents.length === 1) {
    return fileContents[0];
  }

  const mergeFn = templateMergerConfig.first(({ filenamePattern }) =>
    filenamePattern.test(relativeFilename)
  );

  if (mergeFn) {
    return {
      content: mergeFn.mergeFn(fileContents.map(f => f.content)),
      mode: fileContents.max(f => f.mode)!
    };
  }

  return fileContents.last()!;
};
