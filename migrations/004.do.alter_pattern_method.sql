CREATE TYPE pattern_method AS ENUM (
  'pulse',
  'beat',
  'random',
  'even',
  'periodic',
  'cyclic',
  'subdivision',
  'first',
  'last'
);

ALTER TABLE polyperc_projects
  ADD COLUMN
    pattern_method pattern_method;
