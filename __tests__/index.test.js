import fs from 'fs';
import { expect, test } from '@jest/globals';
import engineDiff from '../src/index.js';

test('stylish json files', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';

  expect(engineDiff(filepath1, filepath2)).toBe(fs.readFileSync('./__fixtures__/stylishResult.txt', 'utf-8'));
});

test('stylish yaml files', () => {
  const filepath1 = 'file1.yaml';
  const filepath2 = 'file2.yaml';

  expect(engineDiff(filepath1, filepath2)).toBe(fs.readFileSync('./__fixtures__/stylishResult.txt', 'utf-8'));
});

test('plain json files', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';

  expect(engineDiff(filepath1, filepath2, 'plain')).toBe(fs.readFileSync('./__fixtures__/plainResult.txt', 'utf-8'));
});

test('plain yaml files', () => {
  const filepath1 = 'file1.yaml';
  const filepath2 = 'file2.yaml';

  expect(engineDiff(filepath1, filepath2, 'plain')).toBe(fs.readFileSync('./__fixtures__/plainResult.txt', 'utf-8'));
});

test('json files', () => {
  const filepath1 = 'file1.yaml';
  const filepath2 = 'file2.yaml';

  expect(engineDiff(filepath1, filepath2, 'json')).toBe(fs.readFileSync('./__fixtures__/jsonResult.txt', 'utf-8'));
});
