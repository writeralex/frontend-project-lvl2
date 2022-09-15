import yaml from 'js-yaml';

const parser = (content, type) => {
  switch (type) {
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    case 'json':
      return JSON.parse(content);
    default:
      throw new Error(`Format ${type} is not supported`);
  }
};

export default parser;
