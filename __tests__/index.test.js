import fs from 'fs';
import { expect, test } from '@jest/globals';
import path from 'path';
import engineDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFile('stylishResult.txt');
const plainResult = readFile('plainResult.txt');
const jsonResult = readFile('jsonResult.txt');

const file1json = getFixturePath('file1.json');
const file2json = getFixturePath('file2.json');
const file1yaml = getFixturePath('file1.yml');
const file2yaml = getFixturePath('file1.yml');

test('stylish json files', () => {
  expect(engineDiff(file1json, file2json)).toEqual(stylishResult);
});

test('stylish yaml files', () => {
  expect(engineDiff(file1yaml, file2yaml)).toEqual(stylishResult);
});

test('plain json files', () => {
  expect(engineDiff(file1json, file2json, 'plain')).toEqual(plainResult);
});

test('plain yaml files', () => {
  expect(engineDiff(file1yaml, file2yaml, 'plain')).toEqual(plainResult);
});

test('json files', () => {
  expect(engineDiff(file1json, file2json, 'json')).toEqual(jsonResult);
});
