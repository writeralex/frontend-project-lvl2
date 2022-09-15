import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import formatterResult from './formatters/index.js';
import buildTree from './buildTree.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);

const parseData = (filepath) => {
  const fullPath = getFullPath(filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const type = fullPath.split('.').pop();
  return parser(content, type);
};

const engineDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const paths = [filepath1, filepath2];
  const data = paths.map(parseData);
  const [obj1, obj2] = data;
  const diff = buildTree(obj1, obj2);
  const result = formatterResult(diff, formatName);
  return result;
};

export default engineDiff;
