BEGIN;

TRUNCATE
  polyperc_patterns,
  polyperc_projects,
  polyperc_users,
  RESTART IDENTITY CASCADE;

INSERT INTO polyperc_users, (user_name, password)
VALUES
  ('Demu_user', 'password'),
  ('Jazzman', 'jazzwrrd'),
  ('funkatron', '123!password'),
  ('cheezeman89', 'oink23oink');

INSERT INTO polyperc_projects, (project_name, creator_id)
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
  pattern_length,
  active_beats,
  rotation,
  is_reversed,
  is_opposite,
  pattern_method
) VALUES
  (
    'Four on the floor',
    1,
    120,
    'snare',
    4,
    8,
    0,
    false,
    false,
    'random'
  ),
    (
    'Amen-break beat',
    1,
    136,
    'snare',
    4,
    8,
    0,
    false,
    false,
    'random'
  ),
  ;

COMMIT;
