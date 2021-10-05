import http from 'k6/http';

import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1 },
    { duration: '1s', target: 10 },
    { duration: '1s', target: 100 },
    { duration: '1s', target: 1000 },

    //{ duration: '1s', target: 1000 },
  ],
};

export default function () {
  const res = http.get('http://localhost:2000/reviews/meta?product_id=2');
  check(res, { 'success login': (r) => r.status === 200 });
  sleep(0.3);
}
