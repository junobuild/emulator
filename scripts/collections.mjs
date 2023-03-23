#!/usr/bin/env node

import {listRules, setRule} from '@junobuild/admin';
import {config} from 'dotenv';
import fetch from 'node-fetch';
import {readFile} from 'node:fs/promises';
import {initIdentity} from './identity.utils.mjs';

config();

const satellite = {
  satelliteId: process.env.CANISTER_ID_satellite,
  fetch,
  identity: initIdentity(),
  env: 'dev'
};

const list = async (type) =>
  listRules({
    type,
    satellite
  });

const readConfig = async () => {
  const buffer = await readFile('./junolator.json');
  const {collections} = JSON.parse(buffer.toString('utf-8'));
  return collections;
};

const configRules = async ({type, rules}) => {
  const existingRules = await list(type);

  await Promise.all(
    rules.map((rule) =>
      setRule({
        type,
        satellite,
        rule: {
          ...(existingRules.find(({collection}) => collection === rule.collection) ?? {}),
          ...rule
        }
      })
    )
  );
};

const setCollections = async () => {
  const {db, storage} = await readConfig();

  await Promise.all([
    configRules({type: 'db', rules: db}),
    configRules({type: 'storage', rules: storage})
  ]);
};

try {
  await setCollections();

  console.log('Collections configuration applied 🎉');
} catch (err) {
  console.error(err);
}
