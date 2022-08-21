import _ from 'lodash';

const isObject = (value) => {
  if (!_.isObject(value)) {
      return `'${value}'`;
    }
  return '[complex value]';
}

const isNested = (key, value, result = '') => {
  if (_.isObject(key)) {
    result = `${result}.${isNested(value)}`;
    }
    return `${result}.${key}`;
}

 export const plain = (diff) => {
     const iter = (node) => {
     const {key, type, value, oldValue, children} = node;
     switch (type) {
      case 'nested':
        const flatChildren = children.flatMap((child) => iter(child));
        return `${flatChildren.join('\n')}`
      case 'added':
        return `Property '${key}' was added with value: ${isObject(value)}`;
      case 'removed':
        return `Property '${key}' was removed`;
      case 'changed':
        return `Property '${key}' was updated. From ${isObject(oldValue)} to ${isObject(value)}`;    
     }
    }
     const result = diff.map((node) => iter(node));
   return `{\n${result.join('\n')}\n}`
 }