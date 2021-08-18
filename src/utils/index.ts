import { SuccessStatus } from '@common/constants/success-status.constant';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as emailExistence from 'email-existence';

/**
 *
 * @param {HttpStatus} status
 * @returns {boolean}
 */
export function isSuccessHttpStatus(status: HttpStatus): boolean {
  return SuccessStatus.includes(status);
}

/**
 * generate hash from string
 * @param {string} origin
 * @returns {string}
 */
export function generateHash(origin: string): string {
  return bcrypt.hashSync(origin, 10);
}

/**
 * generate random string
 * @param length
 * @returns {string}
 */
export function generateRandomString(length: number): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .substr(0, length);
}

/**
 * check matched text with hash
 * @param {string} origin
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function isMatchedHash(
  origin: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(origin, hash);
}

/**
 *
 * @param email
 * @returns {boolean}
 */
export function isRealEmail(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, function (error, response) {
      if (error) reject(error);
      resolve(response);
    });
  });
}
