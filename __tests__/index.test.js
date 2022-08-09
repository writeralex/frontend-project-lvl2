import { engineDiff } from '../index.js'

test('main flow', () => {
    const filepath1 = 'testfile1.json';
    const filepath2 = 'testfile2.json';
    
    expect(engineDiff(filepath1, filepath2).toBe(JSON.parse(fs.readFileSync(`./__fixtures__/result.txt`, 'utf-8'))));
})