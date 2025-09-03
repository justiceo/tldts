#!/usr/bin/env node

'use strict';

// Register ts-node to compile TypeScript sources on the fly
require('ts-node/register');

// Load ICANN trie data
const { rules } = require('../src/data/trie');

function collect(node, parts, out) {
  if (node[0] === 1) {
    out.push(parts.slice().reverse().join('.'));
  }
  for (const [label, child] of Object.entries(node[1])) {
    collect(child, parts.concat(label), out);
  }
}

const suffixes = [];
collect(rules, [], suffixes);
suffixes.sort();

console.log(JSON.stringify(suffixes, null, 2));
