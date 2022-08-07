import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export const engineDiff = (filepath1, filepath2) => {

  const file1 = JSON.parse(fs.readFileSync(`./src/${filepath1}`, 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(`./src/${filepath2}`, 'utf-8'));

  const keysOfFile1 = Object.keys(file1);
  const keysOfFile2 = Object.keys(file2);

  const unionFiles = _.sortBy(_.union(keysOfFile1, keysOfFile2));

  const diff = unionFiles.map((key) => {
    if (!Object.hasOwn(file1, key)) {
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
  const symbols = {
    unchanged: '   ',
    changed: ' - ',
    added: ' + ',
  }
  const genDiff = diff.map((node) => {
    const { key, type, value, oldValue } = node;
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
  console.log(`{\n${genDiff.join('\n')}\n}`);
}
  
