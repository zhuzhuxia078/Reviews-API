DROP DATABASE IF EXISTS review_service;

CREATE DATABASE review_service;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER
);

CREATE TABLE reviews (
  id serial NOT NULL,
  product_id integer NOT NULL,
  rating integer,
  date varchar,
  summary varchar,
  body varchar,
  recommend boolean,
  reported boolean,
  reviewer_name varchar,
  reviewer_email varchar,
  response varchar,
  helpfulness integer,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE characteristics(
  id serial NOT NULL,
  product_id integer NOT NULL,
  name varchar,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE characteristic_reviews(
  id serial NOT NULL,
  characteristics_id integer NOT NULL,
  review_id serial NOT NULL,
  value integer,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE reviews_photos(
  id serial NOT NULL,
  review_id integer,
  url VARCHAR,
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);


COPY products
FROM '/Users/zhuqinyu/HR/SDC/product.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/zhuqinyu/HR/SDC/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics
FROM '/Users/zhuqinyu/HR/SDC/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/Users/zhuqinyu/HR/SDC/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos
FROM '/Users/zhuqinyu/HR/SDC/reviews_photos.csv'
DELIMITER ','
CSV HEADER;