import yaml from 'js-yaml';

const parser = (contentPath, ext) => {
  switch (ext) {
    case '.yml':
    case '.yaml':
      return yaml.load(contentPath);
    case '.json':
      return JSON.parse(contentPath);
    default:
      throw new Error(`Extension ${ext} is not supported`);
  }
};

export default parser;
