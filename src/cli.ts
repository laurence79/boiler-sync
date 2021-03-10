#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { updateCommand } from './commands';
import { DEFAULT_PROJECT_FILENAME } from './constants';

yargs(process.argv.slice(2))
  .command(
    'update [project]',
    'updates project boilerplate',
    y => {
      y.positional('project', {
        describe: 'project directory or file',
        default: '.'
      });
    },
    argv => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        const maybeProjectFile = path.resolve(argv.project as string);

        const projectDir = fs.statSync(maybeProjectFile).isDirectory()
          ? maybeProjectFile
          : path.dirname(maybeProjectFile);

        const projectFile =
          maybeProjectFile === projectDir
            ? path.join(maybeProjectFile, DEFAULT_PROJECT_FILENAME)
            : maybeProjectFile;

        const result = await updateCommand(projectFile, projectDir);

        if (!result.success) {
          console.error(
            `\n\nFAILED. ${JSON.stringify(result.reason, null, 2)}`
          );

          process.exit(1);
        }

        console.log('\n\nSUCCESS!');

        process.exit(0);
      })();
    }
  )
  .parse();
