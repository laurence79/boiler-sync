import fs from 'fs';
import path from 'path';
import { expandHandlebars } from './expandHandlebars';
import { templateMergerConfig } from './templateMergerConfig';

export const getTemplateContents = (
  templatePaths: string[],
  relativeFilename: string,
  parameterValues: Record<string, string>
): string => {
  const fileContents = templatePaths.compactMap(dir => {
    const filename = path.join(dir, relativeFilename);

    if (fs.existsSync(filename)) {
      return fs.readFileSync(filename, 'utf-8');
    }

    const maybeHbsFile = `${filename}.hbs`;

    if (fs.existsSync(maybeHbsFile)) {
      return expandHandlebars(maybeHbsFile, parameterValues);
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
    return mergeFn.mergeFn(fileContents);
  }

  return fileContents.last()!;
};
