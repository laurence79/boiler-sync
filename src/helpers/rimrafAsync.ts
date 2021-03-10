import rimraf from 'rimraf';

export const rimrafAsync = (path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    rimraf(path, error => (error ? reject(error) : resolve()));
  });
};
