import { createCipheriv, randomBytes, createDecipheriv } from 'crypto'

const inputEncoding = 'utf8'
const outputEncoding = 'hex'

export function encrypt(text, password, { algorithm = 'aes-256-ctr' } = {}) {
  const iv = new Buffer(randomBytes(16))
  const cipher = createCipheriv(algorithm, password, iv)
  let crypted = cipher.update(text, inputEncoding, outputEncoding)
  crypted += cipher.final(outputEncoding)
  return `${iv.toString('hex')}:${crypted.toString()}`
}

export function decrypt(text, password, { algorithm = 'aes-256-ctr' } = {}) {
  const textParts = text.split(':')
  const iv = new Buffer(textParts.shift(), outputEncoding)
  const encryptedText = textParts.join(':')
  const decipher = createDecipheriv(algorithm, password, iv)
  let decrypted = decipher.update(encryptedText, outputEncoding, inputEncoding)
  decrypted += decipher.final(inputEncoding)
  return decrypted.toString()
}
