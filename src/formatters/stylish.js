import _ from 'lodash';

const isObject = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valueKeys = Object.keys(value);
  const str = '  ';
  const mapKeys = valueKeys.map((key) => `${str.repeat((depth + 1) * 4 - 2)}${key}: ${isObject(value[key], depth + 1)}`);
  return `{\n${mapKeys.join('\n')}\n${str.repeat(depth * 4 - 2)}}`;
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
    const str = ' ';
    switch (type) {
      case 'unchanged':
      case 'added':
      case 'removed':
        return `${str.repeat(depth * 4 - 2)}${symbols[type]} ${key}: ${isObject(value, depth)}`;
      case 'changed':
        return `${str.repeat(depth * 4 - 2)}${symbols.removed} ${key}: ${isObject(oldValue, depth)}\n${str.repeat(depth * 4 - 2)}${symbols.added} ${key}: ${isObject(value, depth)}`;
      case 'nested':
        return `${str.repeat(depth * 4 - 2)}${key}: {\n${children.flatMap((child) => iter(child, depth + 1)).join('\n')}\n${str.repeat(depth * 4 - 2)}}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = diff.map((node) => iter(node));
  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
