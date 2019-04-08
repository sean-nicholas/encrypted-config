import { decrypt } from './crypto'
import * as _ from 'lodash'

export function decryptConfig(encryptionKey: string) {
  return (fileConfig, name) => {
    const data = _.get(fileConfig, name)
    if (data) {
      _.set(fileConfig, name, decrypt(data, encryptionKey))
    }
  }
}