import { md5 } from 'js-md5';

const date = new Date();
const timestamp = date.toISOString().slice(0, 10).replace(/[\D]/g, '');
const hash = md5(`${import.meta.env.VITE_QUERY_PASSWORD}_${timestamp}`)

export const config = {
  API_ENDPOINT: import.meta.env.VITE_ENDPOINT,
  API_AUTH_KEY: hash,
  PAGE_SIZE: 50,
};
