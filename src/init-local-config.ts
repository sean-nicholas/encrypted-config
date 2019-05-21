import { join } from 'path'
import { writeFileSync } from 'fs'
import * as _ from 'lodash'

type Modifier<T> = (config: T) => T

export function initLocalConfig<T>({
  config,
  modifier = (config) => config,
  filePath = join(process.cwd(), 'config.json'),
}: {
  config: T
  modifier?: Modifier<T>
  filePath?: string
}) {
  const clonedConfig = _.cloneDeep(config)
  const modifiedConfig = modifier(clonedConfig)

  try {
    const content = JSON.stringify(modifiedConfig, null, 2)
    writeFileSync(filePath, content)
  } catch (error) {
    console.log('Could not write local configuration. Reason:', error.message)
  }
}