
import yaml from 'js-yaml';

const parser = (contentPath, ext) => {
    switch (ext) {
        case '.yml':
        case '.yaml':
            return yaml.load(contentPath);
        case '.json':
            return JSON.parse(contentPath);
    }
}

export default parser;