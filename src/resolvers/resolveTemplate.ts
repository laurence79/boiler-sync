import { AsyncResult } from '@laurence79/ts-results';
import { ResolvedTemplateSource } from '../types/ResolvedTemplateSource';
import { TemplateSource } from '../types/TemplateSource';
import { resolveGitTemplate } from './resolveGitTemplate';
import { GitCloneFail } from '../types/GitCloneFail';
import { FileLoadFail } from '../types/FileLoadFail';
import { resolveFilesystemTemplate } from './resolveFilesystemTemplate';

export const resolveTemplate = async (
  source: TemplateSource,
  workingDir: string
): AsyncResult<ResolvedTemplateSource, GitCloneFail | FileLoadFail> => {
  if (typeof source === 'object') {
    return resolveGitTemplate(source);
  }

  return resolveFilesystemTemplate(source, workingDir);
};
