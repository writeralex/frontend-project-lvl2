#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
const program = new Command();

program
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
program.parse();