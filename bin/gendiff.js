#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import { engineDiff } from '../src/index.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    // return console.log(JSON.stringify(engineDiff(filepath1, filepath2), null, ' '));
    // console.log(JSON.stringify(engineDiff(filepath1, filepath2)), null, ' ');
    console.log(engineDiff(filepath1, filepath2))
  });
program.parse();

