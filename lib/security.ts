import crypto from "crypto"
import { env } from "./env"

// CSRF Protection
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  const expectedToken = crypto.createHmac("sha256", env.JWT_SECRET).update(sessionToken).digest("hex")

  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken))
}

// Data Encryption
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher("aes-256-cbc", env.ENCRYPTION_KEY)
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")
  return iv.toString("hex") + ":" + encrypted
}

export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(":")
  const iv = Buffer.from(ivHex, "hex")
  const decipher = crypto.createDecipher("aes-256-cbc", env.ENCRYPTION_KEY)
  let decrypted = decipher.update(encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")
  return decrypted
}

// Input Sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential XSS characters
    .trim()
    .slice(0, 1000) // Limit length
}

// API Key Generation
export function generateSecureApiKey(): string {
  return `ck_live_${crypto.randomBytes(32).toString("hex")}`
}

// Password Hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
  return `${salt}:${hash}`
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const [salt, hash] = hashedPassword.split(":")
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(verifyHash))
}
