import { encrypt } from './crypto'
import { createInterface } from 'readline'

export function encrypter(encryptionKey: string) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('What to encrypt? ', (answer) => {
    console.log(encrypt(answer, encryptionKey))

    rl.close()
  })
}
