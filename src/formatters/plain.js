import _ from 'lodash';

const isObject = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`
  }
  return value;
}

const isNested = (key, value, result = '') => {
  if (_.isObject(key)) {
    result = `${result}.${isNested(value)}`;
    }
    return `${result}.${key}`;
}

 export const plain = (diff) => {
     const iter = (node, path = '') => {
     const {key, type, value, oldValue, children} = node;
     switch (type) {
      case 'nested':
        return children.flatMap((child) => iter(child, `${path}${key}.`)).join('\n');
      case 'added':
        return `Property '${path}${key}' was added with value: ${isObject(value)}`;
      case 'removed':
        return `Property '${path}${key}' was removed`;
      case 'changed':
        return `Property '${path}${key}' was updated. From ${isObject(oldValue)} to ${isObject(value)}`;
      case 'unchanged':
        return [];
     }
    }
     const result = diff.map((node) => iter(node));
   return `${result.join('\n')}`
 }