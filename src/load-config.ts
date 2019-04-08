import { join } from 'path'
import { readFileSync } from 'fs'
import * as _ from 'lodash'
import { decryptConfig } from './decrypt-config'


export function loadConfig({
  config,
  encryptedFields,
  encryptionKey,
  filePath = join(process.cwd(), 'config.json'),
}) {
  try {
    const file = readFileSync(filePath).toString()
    const fileConfig = JSON.parse(file)

    const decrypter = decryptConfig(encryptionKey)

    for (const field of encryptedFields) {
      decrypter(fileConfig, field)
    }

    return _.merge(config, fileConfig)
  } catch (error) {
    console.log('No additional config loaded. Reason:', error.message)
    return config
  }
}