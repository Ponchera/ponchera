/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native'
import App from './src/views/app'
import { name as appName } from './app.json'

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
])

AppRegistry.registerComponent(appName, () => App)
