import { ResolvedTemplateSource } from '../types/ResolvedTemplateSource';

export const distinctParameterNames = (
  templateChain: ResolvedTemplateSource[]
): string[] => {
  return templateChain.flatMap(t => t.config.parameters ?? []).distinct();
};
