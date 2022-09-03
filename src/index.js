import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import formatterResult from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);

const parseData = (filepath) => {
  const fullPath = getFullPath(filepath);
  const contentPath = fs.readFileSync(fullPath, 'utf-8');
  const ext = path.extname(fullPath);
  return parser(contentPath, ext);
};

const buildTree = (obj1, obj2) => {
  const keys = [obj1, obj2].flatMap(Object.keys);
  const unionKeys = _.sortBy(_.union(keys));
  const nodes = unionKeys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) { return { key, type: 'added', value: value2 }; }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) { return { key, type: 'removed', value: value1 }; }
    if (value1 === value2) { return { key, type: 'unchanged', value: value1 }; }
    return {
      key, type: 'changed', value: value2, oldValue: value1,
    };
  });
  return nodes;
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
