import _ from 'lodash';

const isObject = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valueKeys = Object.keys(value);
  const str = '  ';
  const mapKeys = valueKeys.map((key) => `${str.repeat(depth + 3)}${key}: ${isObject(value[key], depth)}`);
  return `{\n${mapKeys.join('\n')}\n${str.repeat(depth + 1)}}`;
};

const stylish = (diff) => {
  const symbols = {
    unchanged: ' ',
    removed: '-',
    added: '+',
  };
  const iter = (node, depth = 1) => {
    const {
      key, type, value, oldValue, children,
    } = node;
    const str = '  ';
    switch (type) {
      case 'unchanged':
      case 'added':
      case 'removed':
        return `${str.repeat(depth)}${symbols[type]} ${key}: ${isObject(value, depth)}`;
      case 'changed':
        return `${str.repeat(depth)}${symbols.removed} ${key}: ${isObject(oldValue, depth)}\n${str.repeat(depth)}${symbols.added} ${key}: ${isObject(value, depth)}`;
      case 'nested':
        return `${str.repeat(depth)}${key}: {\n${children.flatMap((child) => iter(child, depth + 1)).join('\n')}\n${str.repeat(depth)}}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = diff.map((node) => iter(node));
  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
