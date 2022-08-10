import fs from 'fs';
import yaml from 'js-yaml';

const parser = (filepath) => {
    if (filepath.includes('ml')) {
        return yaml.load(fs.readFileSync(`./__fixtures__/${filepath}`, 'utf-8'));
      }
    if (filepath.includes('js')) {
        return JSON.parse(fs.readFileSync(`./__fixtures__/${filepath}`, 'utf-8'));
    }
}

export default parser;