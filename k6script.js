import http from 'k6/http';
import { check, sleep } from 'k6';

const HOUSES_AMOUNT = 10000000;

export let options = {
  vus: 240,
  duration: '60s',
};

export default function() {
  let res = http.get(`http://localhost:2000/v2/house/${Math.floor(Math.random() * HOUSES_AMOUNT)}/reservations`);
  check(res, {
    'status was 200': r => r.status == 200,
    // 'transaction time OK': r => r.timings.duration < 200,
    'transaction time OK': r => r.timings.duration < 1000,
  });
  sleep(0.1);
}