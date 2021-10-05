import http from 'k6/http';

import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://localhost:2000/reviews/?product_id=50');
  check(res, { 'success login': (r) => r.status === 200 });
  sleep(0.3);
}
