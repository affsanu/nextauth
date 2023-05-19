import jwt from "jsonwebtoken";

export function signJwtToken(payload) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, {expiresIn: '6d'});
  return token;
}

export function verifyJwtToken(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }

}
