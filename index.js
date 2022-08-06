import fs from 'fs';
import _ from 'lodash';

  const file1 = JSON.parse(fs.readFileSync('./src/file1.json', 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync('./src/file2.json', 'utf-8'))
  
  const keysOfFile1 = Object.keys(file1);
  const keysOfFile2 = Object.keys(file2);

  const unionFiles = _.union(keysOfFile1, keysOfFile2).sort();

  const diff = unionFiles.map((key) => {
    if (!_.has(file1, key)) {
      return {
        key: key,
        type: 'added',
        value: file2[key],
      }
    }
    if (!_.has(file2, key)) {
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

  const genDiff = diff.map((key) => {
    switch(key.type) {
      case 'unchanged':
        return `  ${key.key}: ${key.value}`;
      case 'changed':
        return `- ${key.key}: ${key.oldValue}\n+ ${key.key}: ${key.value}`;
      case 'added':
        return `+ ${key.key}: ${key.value}`;
      case 'removed':
        return `- ${key.key}: ${key.oldValue}`;
    }
  })
  console.log(`{\n${genDiff.join('\n')}\n}`);

  

