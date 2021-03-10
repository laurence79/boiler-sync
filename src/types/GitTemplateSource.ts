/**
 * An object describing the git repository and path within it.
 */

export type GitTemplateSource = {
  /**
   * A git repository to clone, in the format understood by `git-source`.
   *
   * @see https://github.com/IonicaBizau/git-source
   */
  repo: string;

  /**
   * The relative path to a directory within the repository which contains the
   * template.
   */
  path: string;
};
