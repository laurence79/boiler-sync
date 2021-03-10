import fs from 'fs';
import os from 'os';
import path from 'path';
import simpleGit from 'simple-git';
import { v4 as uuid } from 'uuid';
import { AsyncResult, fail, success } from '@laurence79/ts-results';
import { rimrafAsync } from '../helpers/rimrafAsync';
import { ResolvedTemplateSource } from '../types/ResolvedTemplateSource';
import { GitTemplateSource } from '../types/GitTemplateSource';
import { loadTemplateConfigFile } from '../loaders';
import { TEMPLATE_FILENAME } from '../constants';
import { GitCloneFail } from '../types/GitCloneFail';
import { FileLoadFail } from '../types/FileLoadFail';
import { tryGetErrorMessage } from '../helpers';

export const resolveGitTemplate = async (
  source: GitTemplateSource
): AsyncResult<ResolvedTemplateSource, GitCloneFail | FileLoadFail> => {
  const { repo, path: pathInRepo } = source;

  const branch = repo.includes('#')
    ? repo.slice(repo.lastIndexOf('#') + 1)
    : null;

  const clonePath = path.join(os.tmpdir(), uuid());

  console.log(
    `\nResolving template ${pathInRepo} from ${repo} ` +
      `${branch ?? 'default'} branch into ${clonePath}`
  );

  fs.mkdirSync(clonePath, { recursive: true });

  try {
    await simpleGit({
      progress({ progress: p }) {
        console.log(` ---> ${p}% complete`);
      }
    }).clone(source.repo, clonePath, {
      '--depth': '1',
      '--single-branch': null,
      ...(branch ? { '--branch': branch } : {})
    });
  } catch (error: unknown) {
    return fail({ code: 'GIT_CLONE_FAIL', error: tryGetErrorMessage(error) });
  }

  const templateDir = path.join(clonePath, pathInRepo);

  const loadConfigResult = loadTemplateConfigFile(
    path.join(templateDir, TEMPLATE_FILENAME)
  );

  if (!loadConfigResult.success) {
    return loadConfigResult;
  }

  console.log(' ---> SUCCESS');

  return success({
    config: loadConfigResult.data,
    path: templateDir,
    cleanUp: async () => {
      console.log(` ---> Removing ${repo} clone`);
      await rimrafAsync(clonePath);
    }
  });
};
