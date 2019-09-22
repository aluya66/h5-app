/* eslint-disable import/prefer-default-export */
import transModules from 'utils/transModules'

const moduleFiles = require.context('./', false, /\.js$/)

const modules = transModules(moduleFiles)

export {
  modules
}
