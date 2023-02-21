/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS "url" (
  id SERIAL PRIMARY KEY,
  /*
  Max url limit supported by browsers 
  See: https://stackoverflow.com/a/417184/646373
   */
  long_url varchar(1000) NOT NULL,
  short_url varchar(20) NOT NULL
)