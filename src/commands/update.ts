import path from 'path';
import fs from 'fs';
import 'ts-array-extensions';
import { AsyncResult, fail, success } from '@laurence79/ts-results';
import { loadProjectConfigFile } from '../loaders';
import { getTemplateContents } from '../templating/getTemplateContents';
import {
  validateParameters,
  getOutputActionDescription,
  getCombinedFileList,
  distinctParameterNames
} from '../helpers';
import { resolveTemplateChain } from '../resolvers';
import { GitCloneFail } from '../types/GitCloneFail';
import { FileLoadFail } from '../types/FileLoadFail';
import { VOID } from '../constants';

export const updateCommand = async (
  projectFile: string,
  projectDir: string
): AsyncResult<void, GitCloneFail | FileLoadFail | 'INVALID_PARAMETERS'> => {
  const loadProjectConfigResult = loadProjectConfigFile(projectFile);

  if (!loadProjectConfigResult.success) {
    return loadProjectConfigResult;
  }

  const { data: config } = loadProjectConfigResult;

  const result = await resolveTemplateChain(config.uses, projectDir);

  if (!result.success) {
    return result;
  }

  const { data: templateChain } = result;

  const cleanUp = async () => {
    console.log('\nCleaning up');
    await Promise.all(templateChain.map(t => t.cleanUp?.()));
  };

  const parameterNames = distinctParameterNames(templateChain);

  const templatePaths = templateChain.map(t => t.path);

  if (!validateParameters(parameterNames, config.parameters ?? {})) {
    await cleanUp();

    return fail('INVALID_PARAMETERS');
  }

  console.log('\nUpdating files');

  getCombinedFileList(templatePaths).forEach(file => {
    const outputFilename = path.join(projectDir, file);

    const newContent = getTemplateContents(
      templatePaths,
      file,
      config.parameters ?? {}
    );

    const actionDescription = getOutputActionDescription(
      newContent,
      outputFilename
    );

    console.info(` ---> ${actionDescription} ${file}`);

    if (actionDescription !== 'Skipping') {
      fs.mkdirSync(path.dirname(outputFilename), { recursive: true });
      fs.writeFileSync(outputFilename, newContent);
    }
  });

  await cleanUp();

  return success(VOID);
};
