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

export const engineDiff = (filepath1, filepath2) => {
  const paths = [filepath1, filepath2];
  const data = paths.map(parseData);
  const [obj1, obj2] = data;
  const unionKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const mapKeys = (obj1, obj2) => unionKeys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (typeof value1 === 'object' || typeof value2 === 'object') {
      return {
        key,
        type: 'nested',
        children: mapKeys(value1, value2)
      }
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {
        key: key,
        type: 'added',
        value: value2,
      }
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        key: key,
        type: 'removed',
        oldValue: value1,
      }
    }
    if (value1 === value2) {
      return {
        key: key,
        type: 'unchanged',
        value: value1,
      }
    }
    if (value1 !== value2) {
      return {
        key: key,
        type: 'changed',
        value: value2,
        oldValue: value1,
      }
    }
  })
  console.log(JSON.stringify(mapKeys(obj1, obj2), null, ' '))
}


// BEFORE
// const diffResult = mapKeys(obj1, obj2);
// const genDiff = (diffResult) => diffResult.map((node) => {
//   const {key, type, value, oldValue, }
// })
//   const genDiff = (diffResult) => {
//     // console.log(JSON.stringify(diffResult, null, ' '))
//     const engine = diffResult.map((node) => {      
//     const { key, type, value, oldValue } = node;
//     // if (typeof node === 'object') {
//       // const obj = Object.keys(keyNode);
//       // return `${node}: ${genDiff(obj)}`
//      //  }
//     const symbols = {
//       unchanged: '   ',
//       changed: ' - ',
//       added: ' + ',
//     }
//     switch(type) {
//       case 'unchanged':
//         return `${symbols.unchanged}${key}: ${value}`;
//       case 'changed':
//         return `${symbols.added}${key}: ${oldValue}\n${symbols.added}${key}: ${value}`;
//       case 'added':
//         return `${symbols.added}${key}: ${value}`;
//       case 'removed':
//         return `${symbols.changed}${key}: ${oldValue}`;
//     }
//   })
//   // console.log(JSON.stringify(engine, null, ' '));
//   return `{\n${genDiff.join('\n')}\n}`;
// }