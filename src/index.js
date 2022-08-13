import _ from 'lodash';
import parser from '../src/parser.js';

export const engineDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  

  const keysOfFile1 = Object.keys(file1);
  const keysOfFile2 = Object.keys(file2);
 
  const unionFiles = _.sortBy(_.union(keysOfFile1, keysOfFile2));
  const diffResult = diff(unionFiles, file1, file2);
  // console.log(JSON.stringify(diffResult, null, ' '));
  const genDiffResult = genDiff(diffResult);
  
}
  const genDiff = (diffResult) => {
    // console.log(JSON.stringify(diffResult, null, ' '))
    const engine = diffResult.map((node) => {      
    const { key, type, value, oldValue } = node;
    // if (typeof node === 'object') {
      // const obj = Object.keys(keyNode);
      // return `${node}: ${genDiff(obj)}`
     //  }
    const symbols = {
      unchanged: '   ',
      changed: ' - ',
      added: ' + ',
    }
    switch(type) {
      case 'unchanged':
        return `${symbols.unchanged}${key}: ${value}`;
      case 'changed':
        return `${symbols.added}${key}: ${oldValue}\n${symbols.added}${key}: ${value}`;
      case 'added':
        return `${symbols.added}${key}: ${value}`;
      case 'removed':
        return `${symbols.changed}${key}: ${oldValue}`;
    }
  })
  // console.log(JSON.stringify(engine, null, ' '));
  return `{\n${genDiff.join('\n')}\n}`;
}


const diff = (unionFiles, file1, file2) => {
  const mapDiff = unionFiles.map((key) => {
    if (typeof file1[key] === 'object' || typeof file2[key] === 'object') {
      const obj = Object.keys(file1[key]);
      return `${key}: ${diff(obj, file1, file2)}`
    }
    if (!Object.hasOwn(file1, key)) {
      console.log('file1', file1)
      console.log('key', key)
      console.log(Object.hasOwn(file1, key))
      return {
        key: key,
        type: 'added',
        value: file2[key],
      }
    }
    if (!Object.hasOwn(file2, key)) {
      return {
        key: key,
        type: 'removed',
        oldValue: file1[key],
      }
    }
    if (file1[key] === file2[key]) {
      return {
        key: key,
        type: 'unchanged',
        value: file1[key],
      }
    }
    if (file1[key] !== file2[key]) {
      return {
        key: key,
        type: 'changed',
        value: file2[key],
        oldValue: file1[key],
      }
    }
  });
  // console.log(JSON.stringify(mapDiff, null, ' '))
  return mapDiff;
}
  

