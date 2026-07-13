// Founders Lab authentication — demo-account gate.
// Credentials are never stored in plaintext: the entered values are hashed
// with SHA-256 (Web Crypto) and compared against the stored digests.
// NOTE: any purely client-side gate can be bypassed by a determined user with
// devtools — when this expands to public use it must move behind a real backend.

const EMAIL_HASH = '1be81291633c40ce070dc97b7aa7316a06366efebfd39b30fc09303870ebecff'
const PASS_HASH = 'ad5561d2f2034f7a6b73ee5760cbc612cb04480866df0b322bc2af34e31bd3bc'

const SESSION_KEY = 'fl_session_v1'
const ATTEMPTS_KEY = 'fl_attempts_v1'
const SESSION_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 60 * 1000 // 1 minute lockout after 5 failures

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function readAttempts() {
  try {
    return JSON.parse(localStorage.getItem(ATTEMPTS_KEY)) || { count: 0, lockedUntil: 0 }
  } catch {
    return { count: 0, lockedUntil: 0 }
  }
}

function writeAttempts(a) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(a))
}

export function getLockoutRemaining() {
  const { lockedUntil } = readAttempts()
  return Math.max(0, lockedUntil - Date.now())
}

export async function login(email, password) {
  const remaining = getLockoutRemaining()
  if (remaining > 0) {
    return { ok: false, error: `Too many failed attempts. Try again in ${Math.ceil(remaining / 1000)}s.` }
  }

  const [emailHash, passHash] = await Promise.all([
    sha256Hex(email.trim().toLowerCase()),
    sha256Hex(password),
  ])

  if (emailHash !== EMAIL_HASH || passHash !== PASS_HASH) {
    const attempts = readAttempts()
    attempts.count += 1
    if (attempts.count >= MAX_ATTEMPTS) {
      attempts.lockedUntil = Date.now() + LOCKOUT_MS
      attempts.count = 0
    }
    writeAttempts(attempts)
    return { ok: false, error: 'Invalid credentials. Access to The Founders Lab is restricted.' }
  }

  writeAttempts({ count: 0, lockedUntil: 0 })
  const token = crypto.getRandomValues(new Uint8Array(24)).reduce((s, b) => s + b.toString(16).padStart(2, '0'), '')
  const session = { token, email: 'demo@gmail.com', issuedAt: Date.now(), expiresAt: Date.now() + SESSION_TTL_MS }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { ok: true, session }
}

export function getSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    if (!session || !session.token || Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY)
}
