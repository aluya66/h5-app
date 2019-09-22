/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import transModules from 'utils/transModules'

const moduleFiles = require.context('./', false, /\.js$/)

export default transModules(moduleFiles)
