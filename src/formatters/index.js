import { stylish } from './stylish.js'
import { plain } from './plain.js'

export const formatterResult = (diff, formatName) => {
  switch (formatName) {
      case 'stylish':
          return stylish(diff);
      case 'plain':
          return plain(diff);
  }
}