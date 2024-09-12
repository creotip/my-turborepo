const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's Base32
const ENCODING_LEN = ENCODING.length;
const TIME_LEN = 10;
const RANDOM_LEN = 16;

function randomChar(): string {
  return ENCODING[Math.floor(Math.random() * ENCODING_LEN)];
}

function encodeTime(now: number, len: number): string {
  let str = "";
  for (let i = len - 1; i >= 0; i--) {
    const mod = now % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    now = (now - mod) / ENCODING_LEN;
  }
  return str;
}

export function generateULID(): string {
  const now = Date.now();
  const time = encodeTime(now, TIME_LEN);
  let random = "";

  for (let i = 0; i < RANDOM_LEN; i++) {
    random += randomChar();
  }

  return time + random;
}
