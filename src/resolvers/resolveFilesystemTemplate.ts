import path from 'path';
import { Result, success } from '@laurence79/ts-results';
import { ResolvedTemplateSource } from '../types/ResolvedTemplateSource';
import { loadTemplateConfigFile } from '../loaders/loadTemplateConfigFile';
import { TEMPLATE_FILENAME } from '../constants';
import { FileLoadFail } from '../types/FileLoadFail';
import { FileTemplateSource } from '../types/FileTemplateSource';

export const resolveFilesystemTemplate = (
  source: FileTemplateSource,
  currentDirectory: string
): Result<ResolvedTemplateSource, FileLoadFail> => {
  const templateDirPath = path.resolve(currentDirectory, source);

  console.log(`\nResolving template ${source}`);

  const loadConfigResult = loadTemplateConfigFile(
    path.join(templateDirPath, TEMPLATE_FILENAME)
  );

  if (!loadConfigResult.success) {
    return loadConfigResult;
  }

  console.log(' ---> SUCCESS');

  return success({
    config: loadConfigResult.data,
    path: templateDirPath
  });
};
