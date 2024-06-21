import config from '../config.js';
import crypto from 'crypto';
export function hashPass (password) {
  const hash = crypto.pbkdf2Sync(password, config.SALT, 1000, 64, 'sha512').toString('hex');
  return hash.toString();
}
