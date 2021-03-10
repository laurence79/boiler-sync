import { AsyncResult, success } from '@laurence79/ts-results';
import { ResolvedTemplateSource } from '../types/ResolvedTemplateSource';
import { TemplateSource } from '../types/TemplateSource';
import { GitCloneFail } from '../types/GitCloneFail';
import { FileLoadFail } from '../types/FileLoadFail';
import { resolveTemplate } from './resolveTemplate';

export const resolveTemplateChain = async (
  source: TemplateSource,
  workingDir: string
): AsyncResult<ResolvedTemplateSource[], GitCloneFail | FileLoadFail> => {
  const result = await resolveTemplate(source, workingDir);
  if (!result.success) {
    return result;
  }

  const { data: resolvedSource } = result;

  if (resolvedSource.config.inherits) {
    const parentResult = await resolveTemplateChain(
      resolvedSource.config.inherits,
      resolvedSource.path
    );

    if (!parentResult.success) {
      return parentResult;
    }

    return success([...parentResult.data, resolvedSource]);
  }

  return success([resolvedSource]);
};
