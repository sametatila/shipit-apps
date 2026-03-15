import * as migration_20260315_180454_initial from './20260315_180454_initial';

export const migrations = [
  {
    up: migration_20260315_180454_initial.up,
    down: migration_20260315_180454_initial.down,
    name: '20260315_180454_initial'
  },
];
