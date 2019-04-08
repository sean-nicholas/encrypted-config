# Encrypted Config

Loads a config.json file from disk and decrypts encrypted values.


## Usage

### Encryption

To encrypt settings for your configuration file run `encrypter(encryptionKey)`.
This starts a CLI. Enter your secret and the encrypted value will be printed.


### Load & Patch Config

Generally, you start with a simple config object that you define in your source code. It is filled with development / standard values.
```ts
export let config = {
  mail: {
    config: {
      pool: true,
      host: 'localhost',
      port: 1025,
      secure: false,
      ignoreTLS: true,
      auth: {
        user: '',
        pass: '',
      }
    },
  },
}
```

Then load the config with:
```ts
config = loadConfig({
  config,
  encryptedFields: ['mail.config.auth.pass'],
  encryptionKey: ENCRYPTION_KEY,
  filePath: '/path/to/config.json' // Defaults to process.cwd()/config.json
})
```

Afterwards you can use the config object as usual: 
```ts
const password = config.mail.auth.pass
```

The config.json in this example would look like this:

```json
{
  "mail": {
    "config": {
      "auth": {
        "user": "test@example.com",
        "pass": "c0a15190ec84532eaba420a2bdc269b9:e93wa3c963"
      }
    }
  }
}
```