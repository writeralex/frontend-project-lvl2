import _ from 'lodash';

const makeIndent = (depth) => {
  const str = ' ';
  return str.repeat(depth * 4 - 2);
};

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const valueKeys = Object.keys(value);
  const mapKeys = valueKeys.map((key) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${mapKeys.join('\n')}\n  ${makeIndent(depth)}}`;
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
    switch (type) {
      case 'unchanged':
      case 'added':
      case 'removed':
        return `${makeIndent(depth)}${symbols[type]} ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          `${makeIndent(depth)}${symbols.removed} ${key}: ${stringify(oldValue, depth)}`,
          `${makeIndent(depth)}${symbols.added} ${key}: ${stringify(value, depth)}`,
        ];
      case 'nested':
        return `${makeIndent(depth)}  ${key}: {\n${children.flatMap((child) => iter(child, depth + 1)).join('\n')}\n${makeIndent(depth)}  }`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = diff.flatMap((node) => iter(node));
  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
