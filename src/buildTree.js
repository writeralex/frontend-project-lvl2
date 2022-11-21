import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = [data1, data2].flatMap(Object.keys);
  const unionKeys = _.sortBy(_.union(keys));
  const nodes = unionKeys.map((key) => {
    const [value1, value2] = [data1[key], data2[key]];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      };
    }
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) { return { key, type: 'added', value: value2 }; }
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) { return { key, type: 'removed', value: value1 }; }
    if (value1 === value2) { return { key, type: 'unchanged', value: value1 }; }
    return {
      key, type: 'changed', value: value2, oldValue: value1,
    };
  });
  return nodes;
};

export default buildTree;
