import axios from 'axios';
import { config } from '../lib/config';
import { BodyType } from './types';

export const instansAxios = axios.create({
  baseURL: config.API_ENDPOINT,
  headers: { 'X-Auth': config.API_AUTH_KEY },
});

export const fetch = async <R, T>(body: BodyType<T>) => {
  const res = await instansAxios.post<{ result: R }>('/', {
    action: body.action,
    params: body.params,
  });

  return res;
};
