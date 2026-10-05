import crypto from 'crypto';

/**
 * Server-only cryptographic utility for encrypting and decrypting sensitive tokens
 * using AES-256-GCM authenticated encryption.
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits recommended for AES-GCM
const AUTH_TAG_LENGTH = 16; // 128 bits

function getEncryptionKey(): Buffer {
  const rawKey = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;
  if (!rawKey) {
    throw new Error(
      'GOOGLE_TOKEN_ENCRYPTION_KEY environment variable is missing.'
    );
  }

  // If the key is a 64-char hex string, decode directly; otherwise derive a 256-bit key via SHA-256
  if (rawKey.length === 64 && /^[0-9a-fA-F]+$/.test(rawKey)) {
    return Buffer.from(rawKey, 'hex');
  }

  return crypto.createHash('sha256').update(rawKey, 'utf-8').digest();
}

/**
 * Encrypts a plaintext string using AES-256-GCM with a unique cryptographically random IV.
 * Returns formatted string: ivHex:authTagHex:ciphertextHex
 */
export function encrypt(plaintext: string): string {
  if (!plaintext) {
    throw new Error('Cannot encrypt empty or null value.');
  }

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf-8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Decrypts a formatted ciphertext string (ivHex:authTagHex:ciphertextHex) using AES-256-GCM.
 * Validates integrity and authenticity via the GCM authentication tag.
 */
export function decrypt(encryptedPayload: string): string {
  if (!encryptedPayload) {
    throw new Error('Cannot decrypt empty payload.');
  }

  const parts = encryptedPayload.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted payload format.');
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString('utf-8');
}
