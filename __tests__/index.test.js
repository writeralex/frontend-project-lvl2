import { engineDiff } from '../index.js'
import fs from 'fs';
import { expect, test } from '@jest/globals';

test('json files', () => {
    const filepath1 = `file1.json`;
    const filepath2 = `file2.json`;
    
    expect(engineDiff(filepath1, filepath2).toBe(fs.readFileSync(`./__fixtures__/result.txt`, 'utf-8')));
})

test('yaml files', () => {
    const filepath1 = `file1.yaml`;
    const filepath2 = `file2.yaml`;

    expect(engineDiff(filepath1, filepath2).toBe(fs.readFileSync(`./__fixtures__/result.txt`, 'utf-8')));
})