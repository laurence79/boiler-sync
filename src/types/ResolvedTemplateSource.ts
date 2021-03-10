import { TemplateConfig } from './TemplateConfig';

export type ResolvedTemplateSource = {
  config: TemplateConfig;
  path: string;
  cleanUp?: () => Promise<void>;
};
