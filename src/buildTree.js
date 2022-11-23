import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = [data1, data2].flatMap(Object.keys);
  const unionKeys = _.sortBy(_.union(keys));
  const nodes = unionKeys.map((key) => {
    const [dataValue1, dataValue2] = [data1[key], data2[key]];
    if (_.isPlainObject(dataValue1) && _.isPlainObject(dataValue2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(dataValue1, dataValue2),
      };
    }
    if (!Object.hasOwn(data1, key)) { return { key, type: 'added', value1: dataValue2 }; }
    if (!Object.hasOwn(data2, key)) { return { key, type: 'removed', value1: dataValue1 }; }
    if (dataValue1 === dataValue2) { return { key, type: 'unchanged', value1: dataValue1 }; }
    return {
      key, type: 'changed', value1: dataValue2, value2: dataValue1,
    };
  });
  return nodes;
};

export default buildTree;
