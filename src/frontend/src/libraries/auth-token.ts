import Cookies from 'universal-cookie';

import { getItem, setItem, removeItem } from './local-storage';
import { createEvent } from './create-event';

// auth token storage keys
const KEY_AUTH_TOKEN = 'authToken';
const COOKIE_JWT_TOKEN = 'todoapp-authToken';
const COOKIE_JWT_MAX_AGE = 60 * 60 * 24 * 30;

// authorized events
export const AUTH_TOKEN_EVENT = 'token-changed';
const tokenChangedEvent = createEvent(AUTH_TOKEN_EVENT);

/**
 * tokenを取得
 */
export function getToken() {
  return getItem(KEY_AUTH_TOKEN);
}

/**
 * tokenを設定
 * @param token ログインAPIなどで取得した JWT Token
 */
export function setToken(token: string) {
  setItem(KEY_AUTH_TOKEN, token);

  const cookies = new Cookies();
  cookies.set(COOKIE_JWT_TOKEN, token, {
    path: '/',
    maxAge: COOKIE_JWT_MAX_AGE,
    sameSite: 'lax',
    // secure: true,
  });

  global?.document?.dispatchEvent(tokenChangedEvent);
}

/**
 * tokenをクリア
 */
export function resetToken() {
  removeItem(KEY_AUTH_TOKEN);
  global?.document?.dispatchEvent(tokenChangedEvent);
}
