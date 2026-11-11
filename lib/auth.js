import jwt from 'jsonwebtoken';

// Client logins: a signed token kept in localStorage and sent back as
// "Authorization: Bearer <token>". There is deliberately no fallback secret —
// with a guessable one, anyone could sign a token for any user.
function secret() {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set in .env');
  return process.env.JWT_SECRET;
}

// Clients stay logged in for a week; when it runs out, the site signs them
// out and asks them to log in again (lib/session.ts).
export function signLoginToken(userId) {
  return jwt.sign({ userId }, secret(), { expiresIn: '7d' });
}

// The signed-in user's id, or null when the token is missing, expired or fake.
export function getUserId(req) {
  const header = req.headers.get('authorization') || '';
  if (!header.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(header.slice(7), secret()).userId ?? null;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) return null; // includes expired
    throw error;
  }
}
