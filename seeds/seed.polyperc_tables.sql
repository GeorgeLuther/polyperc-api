BEGIN;

TRUNCATE
  polyperc_patterns,
  polyperc_projects,
  polyperc_users
  RESTART IDENTITY CASCADE;

INSERT INTO polyperc_users (user_name, password)
VALUES
  ('Demo_user', 'password'),
  ('Jazzman', 'jazzwrrd'),
  ('funkatron', '123!password'),
  ('cheezeman89', 'oink23oink');

INSERT INTO polyperc_projects (project_name, creator_id)
VALUES
  ('Demo project', 1),
  ('Suite for the Singularity', 1),
  ('My old salad', 3),
  ('Funky beat no.3', 3),
  ('Hunk of burning bytes', 2),
  ('Salsicha Cha Cha', 2);

INSERT INTO polyperc_patterns (
  pattern_name,
  project_id,
  tempo,
  sound,
  active_beats,
  pattern_length,
  rotation,
  is_reversed,
  is_opposite,
  pattern_method,
  pattern,
  original_pattern
) VALUES
  (
    'Four on the floor',
    1,
    120,
    'C-1',
    4,
    8,
    0,
    false,
    false,
    'random',
    '{0,1,1,0,1,0,1,0}',
    '{0,1,1,0,1,0,1,0}'
  ),
  (
    'Amen-break beat',
    1,
    136,
    'D-1',
    5,
    16,
    0,
    true,
    false,
    'even',
    '{}',
    '{}'
  ),
  (
    'five alive',
    2,
    166,
    'C#-1',
    5,
    10,
    0,
    true,
    false,
    'beat',
    '{0,0,0,0,1,0,0,0,0,0}',
    '{0,0,0,0,1,0,0,0,0,0}'
  ),
   (
    'time vampire',
    2,
    216,
    'F-1',
    3,
    14,
    0,
    false,
    false,
    'first',
    '{1,1,1,0,0,0,0,0,0,0,0,0,0,0}',
    '{1,1,1,0,0,0,0,0,0,0,0,0,0,0}'
  ),
  (
    'offbeatz',
    4,
    90,
    'E-1',
    4,
    16,
    0,
    false,
    true,
    'cyclic',
    '{0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0}',
    '{0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0}'
  );

COMMIT;
