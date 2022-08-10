import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parser = (filepath) => {
    if ((path.extname(filepath)) === ('.yml' || '.yaml')) {
        return yaml.load(fs.readFileSync(`./__fixtures__/${filepath}`, 'utf-8'));
      }
    if ((path.extname(filepath)) === ('.js' || '.json')) {
        return JSON.parse(fs.readFileSync(`./__fixtures__/${filepath}`, 'utf-8'));
    }
}

export default parser;