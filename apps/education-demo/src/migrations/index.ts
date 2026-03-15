import * as migration_20260315_180454_initial from './20260315_180454_initial';
import * as migration_20260315_200000_add_seo_focus_keyword from './20260315_200000_add_seo_focus_keyword';

export const migrations = [
  {
    up: migration_20260315_180454_initial.up,
    down: migration_20260315_180454_initial.down,
    name: '20260315_180454_initial'
  },
  {
    up: migration_20260315_200000_add_seo_focus_keyword.up,
    down: migration_20260315_200000_add_seo_focus_keyword.down,
    name: '20260315_200000_add_seo_focus_keyword'
  },
];
