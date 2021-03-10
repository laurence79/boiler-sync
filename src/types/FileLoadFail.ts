export type FileLoadFail = FileDoesNotExist | ParserFail;

type FileDoesNotExist = {
  code: 'FILE_DOES_NOT_EXIST';
};

type ParserFail = {
  code: 'PARSER_FAIL';
  errors: string[];
};
