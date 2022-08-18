import _ from 'lodash';
import parser from '../src/parser.js';
import path from 'path';
import fs from 'fs';

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);

const parseData = (filepath) => {
  const fullPath = getFullPath(filepath);
  const contentPath = fs.readFileSync(fullPath, 'utf-8');
  const ext = path.extname(fullPath);
  return parser(contentPath, ext);
}

const buildTree = (obj1, obj2) => {
  const keys = [obj1, obj2].flatMap(Object.keys);
  const unionKeys = _.sortBy(_.union(keys));
  const nodes = unionKeys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2)
      }
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) return {key, type: 'added', value: value2}
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) return {key, type: 'removed', oldValue: value1}
    if (value1 === value2) return {key, type: 'unchanged', value: value1}
    return {key, type: 'changed', value: value2, oldValue: value1}
  })
  return nodes;
}

const stylish = (diff) => {
  const symbols = {
    unchanged: '   ',
    changed: ' - ',
    added: ' + ',
  }
  const iter = (node, depth = 1) => {
  const {key, type, value, oldValue, children} = node;
  const str = ' ';
  switch(type) {
    case 'nested':
      const flatChildren = children.flatMap((child) => iter(child, depth + 1));
      return `${str.repeat(depth)} ${key}: {\n${flatChildren.join('\n')}\n${str.repeat(depth)} }`  
    case 'unchanged':
      return `${symbols.unchanged}${key}: ${value}`;
    case 'changed':
      return `${symbols.changed}${key}: ${oldValue}\n${symbols.added}${key}: ${value}`;
    case 'added':
      return `${symbols.added}${key}: ${value}`;
    case 'removed':
      return `${symbols.changed}${key}: ${oldValue}`;
  }
}
const result = diff.map((node) => iter(node));
return `{\n${result.join('\n')}\n}`
}

export const engineDiff = (filepath1, filepath2) => {
  const paths = [filepath1, filepath2];
  const data = paths.map(parseData);
  const [obj1, obj2] = data;
  const diff = buildTree(obj1, obj2);
  const result = stylish(diff);
  return result;
}

// console.log(JSON.stringify(stylish(diff), null, ' '))