import path from 'path';
import sqlite from 'sqlite';

import insert from './insert';
import deleteQuery from './deleteQuery';
import find from './find';
import findOne from './findOne';
import update from './update';
import exec from './exec';
import query from './query';

export const dbPromise = sqlite.open('restro.sqlite', { Promise });

let dbInstance = null;

async function getInstance() {
  if (dbInstance !== null) {
    return dbInstance;
  }

  const db = await dbPromise;

  await db.migrate({ migrationsPath: path.resolve(__dirname, 'migrations') });

  dbInstance = {
    insert: insert.bind(null, db),
    update: update.bind(null, db),
    find: find.bind(null, db),
    findOne: findOne.bind(null, db),
    delete: deleteQuery.bind(null, db),
    exec: exec.bind(null, db),
    query: query.bind(null, db),
  };

  return dbInstance;
}

export async function init() {
  await getInstance();
}

export default {
  execute: async (func) => {
    const db = await getInstance();

    const res = await func(db);

    return res;
  },
};
