-- to log in
  -- psql review_service

-- to execute this file
  -- psql -d review_service -a -f schema.sql

  -- or??
  -- \i shema.sql


DROP DATABASE IF EXISTS review_service;

CREATE DATABASE review_service;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS reviews_photos;
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER
);

CREATE TABLE reviews (
  review_id serial NOT NULL,
  product_id integer NOT NULL,
  rating integer,
  date bigint,
  summary varchar,
  body varchar,
  recommend boolean,
  reported boolean,
  reviewer_name varchar,
  reviewer_email varchar,
  response varchar,
  helpfulness integer,
  PRIMARY KEY(review_id),
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE characteristics(
  id serial NOT NULL,
  product_id integer NOT NULL,
  name varchar,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE characteristic_reviews(
  id serial NOT NULL,
  characteristics_id integer NOT NULL,
  review_id int NOT NULL,
  value integer,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

CREATE TABLE reviews_photos(
  id serial,
  review_id integer NOT NULL,
  url VARCHAR,
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

-- ETL
-- ubuntu pwd: /home/ubuntu/reviews/db
  -- COPY products FROM '/home/ubuntu/reviews/db/product.csv' DELIMITER ',' CSV HEADER;
  -- COPY reviews FROM '/home/ubuntu/reviews/db/reviews.csv' DELIMITER ',' CSV HEADER;
  -- COPY characteristics FROM '/home/ubuntu/reviews/db/characteristics.csv' DELIMITER ',' CSV HEADER;
  -- COPY characteristic_reviews FROM '/home/ubuntu/reviews/db/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
  -- COPY reviews_photos FROM '/home/ubuntu/reviews/db/reviews_photos.csv' DELIMITER ',' CSV HEADER;


COPY products
FROM '/Users/zhuqinyu/HR/SDC/Reviews-API/server/db/product.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/zhuqinyu/HR/SDC/Reviews-API/server/db/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics
FROM '/Users/zhuqinyu/HR/SDC/Reviews-API/server/db/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/Users/zhuqinyu/HR/SDC/Reviews-API/server/db/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos
FROM '/Users/zhuqinyu/HR/SDC/Reviews-API/server/db/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

-- create index
CREATE INDEX reviews_product_id_idx ON reviews USING hash(product_id);
CREATE INDEX reviews_review_id_hash_idx ON reviews USING hash(review_id);
CREATE INDEX reviews_photos_review_id ON reviews_photos USING hash(review_id);

-- CREATE INDEX characteristics_id_hash_idx ON characteristics USING hash(id);

CREATE INDEX cr_review_id_hash_idx ON characteristic_reviews USING hash(review_id);
CREATE INDEX cr_c_id_hash_idx ON characteristic_reviews USING hash(characteristics_id);
CREATE INDEX cr_r_id ON characteristic_reviews USING hash(review_id);

CREATE INDEX cr_product_id_idx ON characteristics USING hash(product_id);
-- SELECT *
-- from reviews
-- LEFT [OUTER] JOIN (

-- )
--     reviews_photos on reviews_photos.review_id = reviews.id WHERE reviews.product_id=$1



-- CREATE TABLE items (
--   id    serial primary key,
--   title text
-- );

-- CREATE TABLE tags (
--   id    serial primary key,
--   title text
-- );

-- CREATE TABLE items_tags (
--   item_id int references items(id),
--   tag_id  int references tags(id),
--   primary key (item_id, tag_id)
-- );


-- -- select all reviews

-- select
--   * from reviews
--   inner OUTER JOIN
--   reviews_photos
--   on reviews_photos.review_id = reviews.id
--   WHERE reviews.product_id=$1

-- -- select all reviews join with photo
-- SELECT
--   reviews.id as review_id,
--   reviews.rating,
--   reviews.summary,
--   reviews.recommend,
--   reviews.body,
--   to_char(reviews.date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as date,
--   reviews.reviewer_name,
--   reviews.helpfulness,
--   JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)) as photos
--   FROM reviews
--   LEFT JOIN reviews_photos
--   ON reviews.id = reviews_photos.review_id
--   WHERE reviews.product_id = $1
--   GROUP BY reviews.id
--   ORDER BY date DESC



