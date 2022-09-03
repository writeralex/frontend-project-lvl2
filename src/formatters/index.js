import stylish from './stylish.js';
import plain from './plain.js';

const formatterResult = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Format ${formatName} is not supported`);
  }
};

export default formatterResult;
